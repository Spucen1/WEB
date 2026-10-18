#!/usr/bin/env python3
"""Task Tracker CLI.

This script implements a simple command line task tracker with priority rating, search, filter, sort capabilities and a toggle for marking tasks as done.

The data is stored in a JSON file called `tasks.json` next to this script.

Usage:
  python task_tracker/taskcli.py add "Your task" -p 4
  python task_tracker/taskcli.py list --sort priority --desc
  python task_tracker/taskcli.py toggle 3
  python task_tracker/taskcli.py help

The interface uses ANSI color codes for better readability.
"""

import os
import sys
import json
import argparse
from datetime import datetime

# ANSI color codes
RESET = '\033[0m'
BOLD = '\033[1m'
GREEN = '\033[32m'
YELLOW = '\033[33m'
RED = '\033[31m'
CYAN = '\033[36m'

# Location of the tasks file (next to this script)
TASKS_FILE = os.path.join(os.path.dirname(__file__), 'tasks.json')


# ---------------------------------------------------------------------------
# Helper functions for task persistence
# ---------------------------------------------------------------------------

def load_tasks():
    """Load existing tasks from the JSON file.
    Returns a list of task dicts.
    """
    if not os.path.exists(TASKS_FILE):
        return []
    try:
        with open(TASKS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return []


def save_tasks(tasks):
    """Persist tasks list to the JSON file."""
    with open(TASKS_FILE, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, indent=2, sort_keys=False)


def get_next_id(tasks):
    """Return an integer ID that is one higher than the maximum existing ID."""
    if not tasks:
        return 1
    return max(task['id'] for task in tasks) + 1


# ---------------------------------------------------------------------------
# Core functionality
# ---------------------------------------------------------------------------

def add_task(description, priority):
    tasks = load_tasks()
    task = {
        'id': get_next_id(tasks),
        'description': description,
        'priority': priority,
        'done': False,
        'created_at': datetime.utcnow().isoformat(timespec='seconds'),
    }
    tasks.append(task)
    save_tasks(tasks)
    print(f"{GREEN}Task added:{RESET} ID={task['id']}  Priority={priority}  Description={description}")


def list_tasks(search=None, filter_priority=None, only_done=None, sort_by='created', descending=False):
    tasks = load_tasks()
    # Apply search filter
    if search:
        search_lc = search.lower()
        tasks = [t for t in tasks if search_lc in t['description'].lower()]
    # Apply priority filter
    if filter_priority:
        tasks = [t for t in tasks if t['priority'] == filter_priority]
    # Apply done/undone filter
    if only_done is not None:
        tasks = [t for t in tasks if t['done'] == only_done]

    # Sorting
    if sort_by == 'priority':
        key_func = lambda t: t['priority']
    elif sort_by == 'created':
        key_func = lambda t: t['created_at']
    elif sort_by == 'description':
        key_func = lambda t: t['description'].lower()
    else:
        key_func = lambda t: t['created_at']
    tasks.sort(key=key_func, reverse=descending)

    # Pretty-print
    if not tasks:
        print("No tasks match the criteria.")
        return

    header = f"{BOLD}{CYAN}{'ID':<4}{'Done':<6}{'Pri':<6}{'Created':<20}{'Description'}{RESET}"
    print(header)
    for t in tasks:
        done_symbol = f"{GREEN}[x]" if t['done'] else f"{YELLOW}[ ]"
        # Priority stars
        stars = '*' * t['priority']
        if t['priority'] >= 4:
            star_color = GREEN
        elif t['priority'] >= 2:
            star_color = YELLOW
        else:
            star_color = RED
        stars_colored = f"{star_color}{stars}{RESET}"
        created = t['created_at'][:19]
        print(f"{t['id']:<4}{done_symbol:<6}{stars_colored:<6}{created:<20}{t['description']}")


def toggle_done(task_id):
    tasks = load_tasks()
    for t in tasks:
        if t['id'] == task_id:
            t['done'] = not t['done']
            status = 'completed' if t['done'] else 'not completed'
            save_tasks(tasks)
            print(f"Task {task_id} marked as {status}.")
            return
    print(f"{RED}Error:{RESET} no task with ID {task_id}." )


def print_help(parser):
    parser.print_help()
    sys.exit(0)


# ---------------------------------------------------------------------------
# Argument parser setup
# ---------------------------------------------------------------------------

def build_parser():
    parser = argparse.ArgumentParser(description="CLI Task Tracker with priority, search, filter and sort capabilities.")
    subparsers = parser.add_subparsers(dest='command')

    # Add
    add_parser = subparsers.add_parser('add', help='Add a new task')
    add_parser.add_argument('description', nargs='+', help='Task description')
    add_parser.add_argument('-p', '--priority', type=int, default=3, choices=range(1,6), help='Priority: 1 (low) to 5 (high) – defaults to 3')

    # List
    list_parser = subparsers.add_parser('list', help='List tasks – can search/filter/sort')
    list_parser.add_argument('-s', '--search', help='Search term for description')
    list_parser.add_argument('-P', '--priority', dest='filter_priority', type=int, choices=range(1,6), help='Filter by exact priority value')
    status_group = list_parser.add_mutually_exclusive_group()
    status_group.add_argument('--done', action='store_true', help='Show only completed tasks')
    status_group.add_argument('--undone', action='store_true', help='Show only incomplete tasks')
    list_parser.add_argument('--sort', choices=['priority', 'created', 'description'], default='created', help='Sort by this field')
    list_parser.add_argument('--desc', action='store_true', help='Sort in descending order')

    # Toggle
    toggle_parser = subparsers.add_parser('toggle', help='Toggle completion status of a task by ID')
    toggle_parser.add_argument('id', type=int, help='Task ID to toggle')

    # Help
    help_parser = subparsers.add_parser('help', help='Show this help message')

    return parser


# ---------------------------------------------------------------------------
# Main execution
# ---------------------------------------------------------------------------

def main(argv=None):
    if argv is None:
        argv = sys.argv[1:]
    parser = build_parser()
    if not argv or argv[0] == 'help':
        print_help(parser)
    args = parser.parse_args(argv)

    if args.command == 'add':
        description = ' '.join(args.description)
        add_task(description, args.priority)
    elif args.command == 'list':
        only_done = None
        if args.done:
            only_done = True
        if args.undone:
            only_done = False
        list_tasks(search=args.search, filter_priority=args.filter_priority, only_done=only_done, sort_by=args.sort, descending=args.desc)
    elif args.command == 'toggle':
        toggle_done(args.id)
    else:
        parser.print_help()


if __name__ == '__main__':
    main()

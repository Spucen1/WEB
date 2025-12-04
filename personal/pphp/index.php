<?php
if (isset($_GET['ajax'])) {
    $quotes = [
        ["The only way to do great work is to love what you do.", "Steve Jobs"],
        ["Life is what happens to you while you're busy making other plans.", "John Lennon"],
        ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
        ["It is during our darkest moments that we must focus to see the light.", "Aristotle"],
        ["The only impossible journey is the one you never begin.", "Tony Robbins"],
        ["In the middle of difficulty lies opportunity.", "Albert Einstein"],
        ["Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill"]
    ];
    
    $randomQuote = $quotes[array_rand($quotes)];
    echo json_encode(['quote' => $randomQuote[0], 'author' => $randomQuote[1]]);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Quote Generator</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
        .quote-box { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px); max-width: 600px; margin: 0 auto; }
        .quote { font-size: 24px; margin-bottom: 20px; font-style: italic; transition: opacity 0.3s; }
        .author { font-size: 18px; opacity: 0.8; transition: opacity 0.3s; }
        .refresh { margin-top: 20px; padding: 10px 20px; background: rgba(255,255,255,0.2); border: none; color: white; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="quote-box">
        <h1>📝 Daily Quote (PHP Powered)</h1>
        <div id="quote-text" class="quote"></div>
        <div id="quote-author" class="author"></div>
        <button class="refresh" onclick="getNewQuote()">New Quote</button>
    </div>

    <script>
        function getNewQuote() {
            fetch('?ajax=1')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('quote-text').innerHTML = '"' + data.quote + '"';
                    document.getElementById('quote-author').innerHTML = '— ' + data.author;
                });
        }
        
        // Load initial quote
        getNewQuote();
    </script>
</body>
</html>
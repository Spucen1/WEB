/* eslint-disable react/no-unknown-property *//* eslint-disable react/no-unknown-property */

import * as THREE from 'three';import * as THREE from 'three';

import { useRef, useState, useEffect, memo } from 'react';import { useRef, useState, useEffect, memo } from 'react';

import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';

import {import {

  useFBO,  useFBO,

  useGLTF,  useGLTF,

  useScroll,  useScroll,

  Image,  Image,

  Scroll,  Scroll,

  Preload,  Preload,

  ScrollControls,  ScrollControls,

  MeshTransmissionMaterial,  MeshTransmissionMaterial,

  Text  Text

} from '@react-three/drei';} from '@react-three/drei';

import { easing } from 'maath';import { easing } from 'maath';



export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }) {export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }) {

  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;

  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;



  const {  const {

    navItems = [    navItems = [

      { label: 'Home', link: '' },      { label: 'Home', link: '' },

      { label: 'About', link: '' },      { label: 'About', link: '' },

      { label: 'Contact', link: '' }      { label: 'Contact', link: '' }

    ],    ],

    ...modeProps    ...modeProps

  } = rawOverrides;  } = rawOverrides;



  return (  return (

    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>

      <ScrollControls damping={0.2} pages={3} distance={0.4}>      <ScrollControls damping={0.2} pages={3} distance={0.4}>

        {mode === 'bar' && <NavItems items={navItems} />}        {mode === 'bar' && <NavItems items={navItems} />}

        <Wrapper modeProps={modeProps}>        <Wrapper modeProps={modeProps}>

          <Scroll>          <Scroll>

            <Typography />            <Typography />

            <Images />            <Images />

          </Scroll>          </Scroll>

          <Scroll html />          <Scroll html />

          <Preload />          <Preload />

        </Wrapper>        </Wrapper>

      </ScrollControls>      </ScrollControls>

    </Canvas>    </Canvas>

  );  );

}}



const ModeWrapper = memo(function ModeWrapper({const ModeWrapper = memo(function ModeWrapper({

  children,  children,

  glb,  glb,

  geometryKey,  geometryKey,

  lockToBottom = false,  lockToBottom = false,

  followPointer = true,  followPointer = true,

  modeProps = {},  lockToTopLeft = false,

  ...props  modeProps = {},

}) {  ...props

  const ref = useRef();}) {

  const { nodes } = useGLTF(glb);  const ref = useRef();

  const buffer = useFBO();  const { nodes } = useGLTF(glb);

  const { viewport: vp } = useThree();  const buffer = useFBO();

  const [scene] = useState(() => new THREE.Scene());  const { viewport: vp } = useThree();

  const geoWidthRef = useRef(1);  const [scene] = useState(() => new THREE.Scene());

  const geoWidthRef = useRef(1);

  useEffect(() => {

    const geo = nodes[geometryKey]?.geometry;  useEffect(() => {

    geo.computeBoundingBox();    const geo = nodes[geometryKey]?.geometry;

    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;    geo.computeBoundingBox();

  }, [nodes, geometryKey]);    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;

  }, [nodes, geometryKey]);

  useFrame((state, delta) => {

    const { gl, viewport, pointer, camera } = state;  useFrame((state, delta) => {

    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);    const { gl, viewport, pointer, camera } = state;

    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;

    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;    let destX = 0;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);    let destY = 0;

    

    if (modeProps.scale == null) {    if (lockToTopLeft) {

      const maxWorld = v.width * 0.9;      destX = -v.width / 2 + 1; // Top left X position

      const desired = maxWorld / geoWidthRef.current;      destY = v.height / 2 - 1;  // Top left Y position

      ref.current.scale.setScalar(Math.min(0.15, desired));    } else if (lockToBottom) {

    }      destX = 0;

      destY = -v.height / 2 + 0.2;

    gl.setRenderTarget(buffer);    } else if (followPointer) {

    gl.render(scene, camera);      destX = (pointer.x * v.width) / 2;

    gl.setRenderTarget(null);      destY = (pointer.y * v.height) / 2;

    }

    // Background Color    

    gl.setClearColor(0x5227ff, 1);    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

  });

    if (modeProps.scale == null) {

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;      const maxWorld = v.width * 0.9;

      const desired = maxWorld / geoWidthRef.current;

  return (      ref.current.scale.setScalar(Math.min(0.15, desired));

    <>    }

      {createPortal(children, scene)}

      <mesh scale={[vp.width, vp.height, 1]}>    gl.setRenderTarget(buffer);

        <planeGeometry />    gl.render(scene, camera);

        <meshBasicMaterial map={buffer.texture} transparent />    gl.setRenderTarget(null);

      </mesh>

      <mesh ref={ref} scale={scale ?? 0.15} rotation-x={Math.PI / 2} geometry={nodes[geometryKey]?.geometry} {...props}>    // Background Color

        <MeshTransmissionMaterial    gl.setClearColor(0x5227ff, 1);

          buffer={buffer.texture}  });

          ior={ior ?? 1.15}

          thickness={thickness ?? 5}  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

          anisotropy={anisotropy ?? 0.01}

          chromaticAberration={chromaticAberration ?? 0.1}  return (

          {...extraMat}    <>

        />      {createPortal(children, scene)}

      </mesh>      <mesh scale={[vp.width, vp.height, 1]}>

    </>        <planeGeometry />

  );        <meshBasicMaterial map={buffer.texture} transparent />

});      </mesh>

      <mesh ref={ref} scale={scale ?? 0.15} rotation-x={Math.PI / 2} geometry={nodes[geometryKey]?.geometry} {...props}>

function Lens({ modeProps, ...p }) {        <MeshTransmissionMaterial

  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;          buffer={buffer.texture}

}          ior={ior ?? 1.15}

          thickness={thickness ?? 5}

function Cube({ modeProps, ...p }) {          anisotropy={anisotropy ?? 0.01}

  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;          chromaticAberration={chromaticAberration ?? 0.1}

}          {...extraMat}

        />

function Bar({ modeProps = {}, ...p }) {      </mesh>

  const defaultMat = {    </>

    transmission: 1,  );

    roughness: 0,});

    thickness: 10,

    ior: 1.15,function Lens({ modeProps, ...p }) {

    color: '#ffffff',  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer={false} lockToTopLeft={true} modeProps={modeProps} {...p} />;

    attenuationColor: '#ffffff',}

    attenuationDistance: 0.25

  };function Cube({ modeProps, ...p }) {

  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;

  return (}

    <ModeWrapper

      glb="/assets/3d/bar.glb"function Bar({ modeProps = {}, ...p }) {

      geometryKey="Cube"  const defaultMat = {

      lockToBottom    transmission: 1,

      followPointer={false}    roughness: 0,

      modeProps={{ ...defaultMat, ...modeProps }}    thickness: 10,

      {...p}    ior: 1.15,

    />    color: '#ffffff',

  );    attenuationColor: '#ffffff',

}    attenuationDistance: 0.25

  };

function NavItems({ items }) {

  const group = useRef();  return (

  const { viewport, camera } = useThree();    <ModeWrapper

      glb="/assets/3d/bar.glb"

  const DEVICE = {      geometryKey="Cube"

    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },      lockToBottom

    tablet: { max: 1023, spacing: 0.24, fontSize: 0.035 },      followPointer={false}

    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.035 }      modeProps={{ ...defaultMat, ...modeProps }}

  };      {...p}

  const getDevice = () => {    />

    const w = window.innerWidth;  );

    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';}

  };

function NavItems({ items }) {

  const [device, setDevice] = useState(getDevice());  const group = useRef();

  const { viewport, camera } = useThree();

  useEffect(() => {

    const onResize = () => setDevice(getDevice());  const DEVICE = {

    window.addEventListener('resize', onResize);    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },

    return () => window.removeEventListener('resize', onResize);    tablet: { max: 1023, spacing: 0.24, fontSize: 0.035 },

    // eslint-disable-next-line react-hooks/exhaustive-deps    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.035 }

  }, []);  };

  const getDevice = () => {

  const { spacing, fontSize } = DEVICE[device];    const w = window.innerWidth;

    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';

  useFrame(() => {  };

    if (!group.current) return;

    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);  const [device, setDevice] = useState(getDevice());

    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

  useEffect(() => {

    group.current.children.forEach((child, i) => {    const onResize = () => setDevice(getDevice());

      child.position.x = (i - (items.length - 1) / 2) * spacing;    window.addEventListener('resize', onResize);

    });    return () => window.removeEventListener('resize', onResize);

  });    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const handleNavigate = link => {

    if (!link) return;  const { spacing, fontSize } = DEVICE[device];

    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);

  };  useFrame(() => {

    if (!group.current) return;

  return (    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    <group ref={group} renderOrder={10}>    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

      {items.map(({ label, link }) => (

        <Text    group.current.children.forEach((child, i) => {

          key={label}      child.position.x = (i - (items.length - 1) / 2) * spacing;

          fontSize={fontSize}    });

          color="white"  });

          anchorX="center"

          anchorY="middle"  const handleNavigate = link => {

          depthWrite={false}    if (!link) return;

          outlineWidth={0}    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);

          outlineBlur="20%"  };

          outlineColor="#000"

          outlineOpacity={0.5}  return (

          depthTest={false}    <group ref={group} renderOrder={10}>

          renderOrder={10}      {items.map(({ label, link }) => (

          onClick={e => {        <Text

            e.stopPropagation();          key={label}

            handleNavigate(link);          fontSize={fontSize}

          }}          color="white"

          onPointerOver={() => (document.body.style.cursor = 'pointer')}          anchorX="center"

          onPointerOut={() => (document.body.style.cursor = 'auto')}          anchorY="middle"

        >          depthWrite={false}

          {label}          outlineWidth={0}

        </Text>          outlineBlur="20%"

      ))}          outlineColor="#000"

    </group>          outlineOpacity={0.5}

  );          depthTest={false}

}          renderOrder={10}

          onClick={e => {

function Images() {            e.stopPropagation();

  const group = useRef();            handleNavigate(link);

  const data = useScroll();          }}

  const { height } = useThree(s => s.viewport);          onPointerOver={() => (document.body.style.cursor = 'pointer')}

          onPointerOut={() => (document.body.style.cursor = 'auto')}

  useFrame(() => {        >

    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;          {label}

    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;        </Text>

    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;      ))}

    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;    </group>

    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;  );

  });}



  return (function Images() {

    <group ref={group}>  const group = useRef();

      <Image position={[-2, 0, 0]} scale={[3, height / 1.1, 1]} url="/assets/demo/cs1.webp" />  const data = useScroll();

      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />  const { height } = useThree(s => s.viewport);

      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url="/assets/demo/cs3.webp" />

      <Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url="/assets/demo/cs1.webp" />  useFrame(() => {

      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;

    </group>    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;

  );    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;

}    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;

    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;

function Typography() {  });

  const DEVICE = {

    mobile: { fontSize: 0.2 },  return (

    tablet: { fontSize: 0.4 },    <group ref={group}>

    desktop: { fontSize: 0.6 }      <Image position={[-2, 0, 0]} scale={[3, height / 1.1, 1]} url="/assets/demo/cs1.webp" />

  };      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />

  const getDevice = () => {      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url="/assets/demo/cs3.webp" />

    const w = window.innerWidth;      <Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url="/assets/demo/cs1.webp" />

    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />

  };    </group>

  );

  const [device, setDevice] = useState(getDevice());}



  useEffect(() => {function Typography() {

    const onResize = () => setDevice(getDevice());  const DEVICE = {

    window.addEventListener('resize', onResize);    mobile: { fontSize: 0.2 },

    return () => window.removeEventListener('resize', onResize);    tablet: { fontSize: 0.4 },

    // eslint-disable-next-line react-hooks/exhaustive-deps    desktop: { fontSize: 0.6 }

  }, []);  };

  const getDevice = () => {

  const { fontSize } = DEVICE[device];    const w = window.innerWidth;

    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';

  return (  };

    <Text

      position={[0, 0, 12]}  const [device, setDevice] = useState(getDevice());

      fontSize={fontSize}

      letterSpacing={-0.05}  useEffect(() => {

      outlineWidth={0}    const onResize = () => setDevice(getDevice());

      outlineBlur="20%"    window.addEventListener('resize', onResize);

      outlineColor="#000"    return () => window.removeEventListener('resize', onResize);

      outlineOpacity={0.5}    // eslint-disable-next-line react-hooks/exhaustive-deps

      color="white"  }, []);

      anchorX="center"

      anchorY="middle"  const { fontSize } = DEVICE[device];

    >

      React Bits  return (

    </Text>    <Text

  );      position={[0, 0, 12]}

}      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      React Bits
    </Text>
  );
}

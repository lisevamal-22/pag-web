import React, { useEffect, useRef, useState } from 'react';

interface MethodologyGlassStageProps {
  /** Progreso normalizado del scroll a lo largo de las 4 fases [0..1] */
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}

/* =====================================================================================
 * ESCULTURA DE VIDRIO FLUIDO — WebGL2 sin dependencias
 *
 * Una única escultura formada por seis cintas de vidrio flexible. Toda la forma es una
 * función continua del progreso del scroll `p`, por lo que al subir la transformación se
 * reproduce exactamente a la inversa:
 *   p 0.00 → 0.25  OBSERVAR     láminas recogidas en un ovillo compacto que empieza a abrirse
 *   p 0.25 → 0.50  COMPRENDER   se expanden, se cruzan y se superponen; la cámara se acerca
 *   p 0.50 → 0.75  INTERPRETAR  las cintas se ordenan en una composición equilibrada
 *   p 0.75 → 1.00  TRANSFORMAR  máxima expansión: composición amplia, abierta y fluida
 *
 * El material imita vidrio: transparencia, refracción y reflexión de un estudio fotográfico
 * procedural, fresnel, bordes brillantes, grosor variable y mezcla cromática en las
 * superposiciones. Los tintes salen exclusivamente de la paleta SENSIA LABs.
 * ===================================================================================== */

const VERT = `#version 300 es
precision highp float;
in vec2 a_uv;               // x: u a lo largo de la cinta [0,1] · y: v a lo ancho [-1,1]

uniform mat4 u_proj;
uniform mat4 u_view;
uniform float u_time;
uniform float u_unfold;     // 0 recogida → 1 desplegada
uniform float u_organize;   // 0 cruces libres → 1 composición ordenada
uniform float u_spread;     // escala de expansión
uniform float u_twist;      // pliegue / torsión
uniform vec4 u_r0;          // yaw, pitch, roll (estado libre), fase
uniform vec4 u_r1;          // yaw, pitch, roll (estado ordenado), anchura
uniform vec4 u_r2;          // longitud, amplitud, frecuencia, radio del ovillo
uniform vec3 u_offset;      // desplazamiento en estado libre

out vec3 v_pos;
out vec3 v_nrm;
out vec2 v_uv;

mat3 rotXYZ(vec3 a) {
  float cx = cos(a.x), sx = sin(a.x);
  float cy = cos(a.y), sy = sin(a.y);
  float cz = cos(a.z), sz = sin(a.z);
  mat3 ry = mat3(cx, 0.0, -sx, 0.0, 1.0, 0.0, sx, 0.0, cx);   // yaw
  mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cy, sy, 0.0, -sy, cy);   // pitch
  mat3 rz = mat3(cz, sz, 0.0, -sz, cz, 0.0, 0.0, 0.0, 1.0);   // roll
  return ry * rx * rz;
}

vec3 centerLocal(float u) {
  float s = u - 0.5;
  // Al ordenarse, las cintas comparten fase y fluyen en paralelo (composición equilibrada)
  float ph = mix(u_r0.w, u_r0.w * 0.22 + 0.6, u_organize);
  float t = u_time;
  float e = u_unfold;

  // Ovillo compacto: lámina enrollada sobre sí misma
  float coilR = u_r2.w * (0.55 + 0.45 * e);
  float th = s * mix(8.5, 2.2, e) + ph;
  vec3 coil = vec3(coilR * cos(th), s * mix(0.7, 1.4, e), coilR * sin(th));

  // Cinta abierta: onda amplia que fluye
  float L = u_r2.x * u_spread;
  float A = u_r2.y * mix(1.0, 0.75, u_organize);
  float k = u_r2.z;
  vec3 open = vec3(
    s * L,
    A * sin(k * s * 3.14159 + ph + t * 0.22) + 0.18 * sin(s * 7.0 + t * 0.31 + ph),
    0.55 * A * cos(k * 0.7 * s * 3.14159 + ph * 1.3 - t * 0.18)
  );

  float m = smoothstep(0.0, 1.0, e);
  return mix(coil, open, m);
}

vec3 center(float u) {
  vec3 ang = mix(u_r0.xyz, u_r1.xyz * (0.55 + 0.55 * u_spread), u_organize);
  mat3 R = rotXYZ(ang);
  vec3 off = u_offset * (1.0 - u_organize) * (0.35 + 0.65 * u_unfold);
  return R * centerLocal(u) + off;
}

vec3 surface(float u, float v) {
  float e = 0.004;
  vec3 c = center(u);
  vec3 T = normalize(center(min(u + e, 1.0)) - center(max(u - e, 0.0)));
  vec3 ang = mix(u_r0.xyz, u_r1.xyz * (0.55 + 0.55 * u_spread), u_organize);
  vec3 up = rotXYZ(ang) * vec3(0.0, 0.0, 1.0);
  vec3 N = normalize(cross(T, up) + vec3(1e-4));
  vec3 B = normalize(cross(N, T));
  float s = u - 0.5;
  float tw = u_twist * s * 3.14159 + u_r0.w * 0.5 + u_time * 0.07;
  vec3 W = cos(tw) * B + sin(tw) * N;
  // Anchura variable: extremos afilados, cuerpo ancho, ligera pulsación
  float taper = pow(sin(3.14159 * clamp(u, 0.0, 1.0)), 0.55);
  float width = u_r1.w * taper * (0.85 + 0.15 * sin(u * 9.0 + u_r0.w + u_time * 0.4)) * mix(0.55, 1.0, u_unfold);
  // Pliegue suave a lo ancho (lámina curvada, no plana)
  vec3 fold = cross(T, W) * (v * v - 0.35) * width * 0.35;
  return c + W * v * width + fold;
}

void main() {
  float u = a_uv.x, v = a_uv.y;
  vec3 p = surface(u, v);
  vec3 pu = surface(min(u + 0.003, 1.0), v) - surface(max(u - 0.003, 0.0), v);
  vec3 pv = surface(u, v + 0.02) - surface(u, v - 0.02);
  v_nrm = normalize(cross(pu, pv));
  v_pos = p;
  v_uv = a_uv;
  gl_Position = u_proj * u_view * vec4(p, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;
in vec3 v_pos;
in vec3 v_nrm;
in vec2 v_uv;
uniform vec3 u_cam;
uniform float u_hue;        // desplazamiento cromático propio de cada cinta
uniform float u_time;
uniform float u_alphaScale;
out vec4 outColor;

const vec3 BLUE   = vec3(0.0, 0.2588, 0.9922);
const vec3 AQUA   = vec3(0.0, 0.8392, 0.7137);
const vec3 YELLOW = vec3(1.0, 0.8235, 0.0118);
const vec3 ORANGE = vec3(0.9961, 0.3647, 0.0392);

// Paleta cíclica restringida a los cuatro colores de marca
vec3 brand(float h) {
  h = fract(h) * 4.0;
  float f = smoothstep(0.0, 1.0, fract(h));
  if (h < 1.0) return mix(BLUE, AQUA, f);
  if (h < 2.0) return mix(AQUA, YELLOW, f);
  if (h < 3.0) return mix(YELLOW, ORANGE, f);
  return mix(ORANGE, BLUE, f);
}

// Estudio fotográfico procedural: fondo blanco roto, softboxes y rebotes de color de marca
vec3 env(vec3 d) {
  vec3 c = vec3(0.965, 0.965, 0.955) * (0.82 + 0.18 * d.y);
  c += vec3(1.0) * smoothstep(0.72, 0.95, d.y) * 0.9;                         // softbox cenital
  c += vec3(1.0) * smoothstep(0.86, 0.99, dot(d, normalize(vec3(-0.8, 0.35, 0.5)))) * 1.1; // ventana lateral
  c += vec3(1.0) * smoothstep(0.93, 0.995, dot(d, normalize(vec3(0.7, 0.2, 0.7)))) * 0.8;
  c = mix(c, BLUE,   smoothstep(0.55, 0.95, dot(d, normalize(vec3(-0.6, -0.6, 0.2)))) * 0.55);
  c = mix(c, AQUA,   smoothstep(0.6, 0.95, dot(d, normalize(vec3(0.9, -0.2, -0.3)))) * 0.45);
  c = mix(c, YELLOW, smoothstep(0.6, 0.95, dot(d, normalize(vec3(0.2, 0.5, -0.9)))) * 0.45);
  c = mix(c, ORANGE, smoothstep(0.65, 0.97, dot(d, normalize(vec3(0.6, -0.7, 0.4)))) * 0.45);
  c *= 1.0 - 0.25 * smoothstep(-0.2, -0.9, d.y);                               // suelo algo más oscuro
  return c;
}

void main() {
  vec3 N = normalize(v_nrm);
  vec3 V = normalize(u_cam - v_pos);
  if (!gl_FrontFacing) N = -N;
  float ndv = clamp(dot(N, V), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 3.0);

  // Grosor aparente: mayor en los bordes y en vistas rasantes
  float edge = smoothstep(0.62, 1.0, abs(v_uv.y));
  float thick = clamp(0.25 + 0.55 * (1.0 - ndv) + 0.6 * edge, 0.0, 1.0);

  // Tinte iridiscente: cambia con el ángulo de visión y a lo largo de la cinta (solo colores de marca)
  vec3 tint = brand(u_hue + 0.22 * v_uv.x + 0.28 * (1.0 - ndv) + 0.03 * sin(u_time * 0.3));

  // Refracción del estudio a través del vidrio, absorción por el tinte
  vec3 T = refract(-V, N, 1.0 / 1.47);
  vec3 refr = env(T) * mix(vec3(1.0), tint, 0.5 + 0.45 * thick);
  // Reflexión
  vec3 R = reflect(-V, N);
  vec3 refl = env(R);
  // Brillos especulares nítidos (vidrio pulido)
  float spec = pow(max(dot(R, normalize(vec3(-0.4, 0.9, 0.35))), 0.0), 90.0) * 1.6
             + pow(max(dot(R, normalize(vec3(0.7, 0.3, 0.6))), 0.0), 140.0) * 1.2;

  vec3 col = mix(refr, refl, 0.15 + 0.7 * fres);
  // Bordes brillantes: el canto del vidrio concentra la luz y el color
  col = mix(col, mix(tint, vec3(1.0), 0.2), edge * 0.6);
  col += vec3(1.0) * edge * pow(1.0 - ndv, 1.5) * 0.35;
  col += spec;

  float alpha = clamp(0.26 + 0.38 * thick + 0.45 * fres + 0.25 * edge + spec * 0.4, 0.0, 0.95) * u_alphaScale;
  // Extremos de cada cinta: desvanecido suave
  alpha *= smoothstep(0.0, 0.05, v_uv.x) * smoothstep(1.0, 0.95, v_uv.x);
  outColor = vec4(clamp(col, 0.0, 1.0) * alpha, alpha);
}
`;

interface RibbonDef {
  free: [number, number, number]; // yaw, pitch, roll en el estado libre (cruces)
  org: [number, number, number]; // yaw, pitch, roll en el estado ordenado (abanico)
  phase: number;
  width: number;
  length: number;
  amp: number;
  freq: number;
  coil: number;
  offset: [number, number, number];
  hue: number; // 0 azul · 0.25 aguamarina · 0.5 amarillo · 0.75 naranja
}

const RIBBONS: RibbonDef[] = [
  { free: [0.2, 0.5, 0.3], org: [-0.55, 0.12, 0.25], phase: 0.0, width: 0.34, length: 3.2, amp: 0.45, freq: 1.6, coil: 0.42, offset: [0.25, 0.2, 0.0], hue: 0.0 },
  { free: [1.4, -0.6, 1.1], org: [-0.32, -0.05, -0.15], phase: 1.3, width: 0.28, length: 3.0, amp: 0.55, freq: 1.3, coil: 0.36, offset: [-0.3, -0.1, 0.2], hue: 0.22 },
  { free: [-0.9, 0.9, -0.4], org: [-0.1, 0.18, 0.35], phase: 2.4, width: 0.4, length: 3.4, amp: 0.4, freq: 1.8, coil: 0.48, offset: [0.1, -0.3, -0.2], hue: 0.47 },
  { free: [2.3, 0.3, -1.2], org: [0.12, -0.12, -0.3], phase: 3.6, width: 0.3, length: 3.1, amp: 0.5, freq: 1.4, coil: 0.4, offset: [-0.15, 0.35, -0.1], hue: 0.72 },
  { free: [-2.0, -0.4, 0.8], org: [0.34, 0.08, 0.2], phase: 4.7, width: 0.24, length: 2.8, amp: 0.6, freq: 1.2, coil: 0.33, offset: [0.35, -0.2, 0.15], hue: 0.9 },
  { free: [0.7, -1.1, 2.0], org: [0.56, -0.1, -0.2], phase: 5.8, width: 0.33, length: 3.3, amp: 0.42, freq: 1.7, coil: 0.44, offset: [-0.25, 0.05, -0.3], hue: 0.35 },
];

// Fotogramas clave a lo largo del scroll (p = 0, 0.25, 0.5, 0.75, 1)
const KEYS = {
  unfold: [0.0, 0.3, 0.62, 0.84, 1.0],
  organize: [0.0, 0.0, 0.12, 0.88, 1.0],
  spread: [0.55, 0.72, 1.0, 1.05, 1.38],
  twist: [2.6, 2.2, 1.7, 0.7, 1.0],
  camDist: [5.2, 4.7, 3.6, 5.3, 7.3],
  camYaw: [0.0, 0.22, 0.5, 0.32, 0.12],
  camPitch: [0.28, 0.22, 0.12, 0.18, 0.24],
  scaleY: [0.85, 0.95, 1.0, 1.0, 1.05],
};

function sampleKeys(arr: number[], p: number): number {
  const x = Math.max(0, Math.min(1, p)) * (arr.length - 1);
  const i = Math.min(arr.length - 2, Math.floor(x));
  const f = x - i;
  const s = f * f * (3 - 2 * f);
  return arr[i] + (arr[i + 1] - arr[i]) * s;
}

// --- matrices mínimas ----------------------------------------------------------------
function perspective(fovy: number, aspect: number, near: number, far: number): Float32Array {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}
function lookAt(eye: number[], target: number[], up: number[]): Float32Array {
  const z = norm([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]]);
  const x = norm(cross(up, z));
  const y = cross(z, x);
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
  ]);
}
const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: number[]) => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

function buildGrid(segU: number, segV: number) {
  const verts: number[] = [];
  for (let i = 0; i <= segU; i++) {
    for (let j = 0; j <= segV; j++) {
      verts.push(i / segU, (j / segV) * 2 - 1);
    }
  }
  const idx: number[] = [];
  const row = segV + 1;
  for (let i = 0; i < segU; i++) {
    for (let j = 0; j < segV; j++) {
      const a = i * row + j;
      idx.push(a, a + row, a + 1, a + 1, a + row, a + row + 1);
    }
  }
  return { verts: new Float32Array(verts), idx: new Uint16Array(idx) };
}

/** Punto representativo de cada fase cuando se prefiere movimiento reducido */
const REDUCED_STATES = [0.08, 0.4, 0.68, 1.0];

export const MethodologyGlassStage: React.FC<MethodologyGlassStageProps> = ({ progressRef, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { antialias: true, premultipliedAlpha: true, alpha: true, powerPreference: 'high-performance' });
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn('[MethodologyGlassStage] shader:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setWebglFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setWebglFailed(true);
      return;
    }
    gl.useProgram(prog);

    const isSmall = window.matchMedia('(max-width: 767px)').matches;
    const grid = buildGrid(isSmall ? 110 : 200, isSmall ? 8 : 12);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, grid.verts, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_uv');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, grid.idx, gl.STATIC_DRAW);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uni = {
      proj: U('u_proj'), view: U('u_view'), time: U('u_time'), unfold: U('u_unfold'), organize: U('u_organize'),
      spread: U('u_spread'), twist: U('u_twist'), r0: U('u_r0'), r1: U('u_r1'), r2: U('u_r2'), offset: U('u_offset'),
      cam: U('u_cam'), hue: U('u_hue'), timeF: U('u_time'), alphaScale: U('u_alphaScale'),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    let width = 1;
    let height = 1;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };
    resize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    ro?.observe(canvas.parentElement!);
    window.addEventListener('resize', resize);

    let smoothed = progressRef.current;
    const start = performance.now();
    let raf = 0;
    let visible = true;

    const draw = (now: number) => {
      const target = reducedMotion
        ? REDUCED_STATES[Math.min(3, Math.floor(Math.min(0.9999, progressRef.current) * 4))]
        : progressRef.current;
      smoothed += (target - smoothed) * (reducedMotion ? 1 : 0.075);
      const p = smoothed;
      const t = reducedMotion ? 4.0 : (now - start) / 1000;

      const aspect = width / Math.max(1, height);
      const camDist = sampleKeys(KEYS.camDist, p) * (aspect < 1 ? 1 + (1 - aspect) * 0.9 : 1);
      const yaw = sampleKeys(KEYS.camYaw, p) + (reducedMotion ? 0 : Math.sin(t * 0.15) * 0.08);
      const pitch = sampleKeys(KEYS.camPitch, p);
      const eye = [Math.sin(yaw) * Math.cos(pitch) * camDist, Math.sin(pitch) * camDist, Math.cos(yaw) * Math.cos(pitch) * camDist];
      gl.uniformMatrix4fv(uni.proj, false, perspective(0.62, aspect, 0.1, 50));
      gl.uniformMatrix4fv(uni.view, false, lookAt(eye, [0, 0, 0], [0, 1, 0]));
      gl.uniform3f(uni.cam, eye[0], eye[1], eye[2]);
      gl.uniform1f(uni.time, t);
      gl.uniform1f(uni.unfold, sampleKeys(KEYS.unfold, p));
      gl.uniform1f(uni.organize, sampleKeys(KEYS.organize, p));
      gl.uniform1f(uni.spread, sampleKeys(KEYS.spread, p));
      gl.uniform1f(uni.twist, sampleKeys(KEYS.twist, p));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Dos pasadas (caras traseras y delanteras) para una transparencia creíble sin ordenar
      for (const face of [gl.FRONT, gl.BACK]) {
        gl.cullFace(face);
        gl.uniform1f(uni.alphaScale, face === gl.FRONT ? 0.65 : 1.0);
        RIBBONS.forEach((r) => {
          gl.uniform4f(uni.r0, r.free[0], r.free[1], r.free[2], r.phase);
          gl.uniform4f(uni.r1, r.org[0], r.org[1], r.org[2], r.width);
          gl.uniform4f(uni.r2, r.length, r.amp, r.freq, r.coil);
          gl.uniform3f(uni.offset, r.offset[0], r.offset[1], r.offset[2]);
          gl.uniform1f(uni.hue, r.hue);
          gl.drawElements(gl.TRIANGLES, grid.idx.length, gl.UNSIGNED_SHORT, 0);
        });
      }

      // Sombra de contacto suave que acompaña la expansión
      if (shadowRef.current) {
        const s = sampleKeys(KEYS.spread, p);
        shadowRef.current.style.transform = `translateX(-50%) scale(${(0.55 + s * 0.45).toFixed(3)}, 1)`;
        shadowRef.current.style.opacity = (0.35 + 0.25 * sampleKeys(KEYS.unfold, p)).toFixed(3);
      }

      const settled = Math.abs(target - smoothed) < 0.0005;
      if (!reducedMotion && visible && document.visibilityState === 'visible') {
        raf = requestAnimationFrame(draw);
      } else if (reducedMotion && !settled) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver((entries) => {
            visible = entries.some((e) => e.isIntersecting);
            if (visible) kick();
          })
        : null;
    io?.observe(canvas);
    const onScroll = () => kick();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onScroll);
    kick();

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      setWebglFailed(true);
    };
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onScroll);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(ibo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [progressRef, reducedMotion]);

  return (
    <div className="absolute inset-0">
      {/* Sombra de contacto sobre el fondo blanco roto */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="absolute left-1/2 bottom-[8%] w-[62%] h-[9%] rounded-[50%] pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(0,66,253,0.16), rgba(0,214,182,0.08) 55%, rgba(0,0,0,0) 100%)',
          filter: 'blur(14px)',
          transform: 'translateX(-50%)',
        }}
      />
      {webglFailed ? (
        // Alternativa sin WebGL: ilustración estática de cintas de vidrio en la paleta de marca
        <img
          src="/src/assets/images/podcast_sensia_cover_1795194942485.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain mix-blend-multiply"
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          role="img"
          aria-label="Escultura abstracta de cintas de vidrio translúcido que se despliega en cuatro fases al desplazarse por la página"
        />
      )}
    </div>
  );
};

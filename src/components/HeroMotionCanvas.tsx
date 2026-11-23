import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_pointer;
  uniform vec2 u_pointer_vel;
  uniform float u_pointer_active;
  uniform float u_ripple;
  uniform vec3 u_frame; // xy: centro de la mancha (espacio de pantalla), z: escala

  // Colores oficiales SENSIA LABs
  const vec3 WHITE  = vec3(1.0);
  const vec3 BLUE   = vec3(0.0, 0.2588, 0.9922);   // #0042FD
  const vec3 AQUA   = vec3(0.0, 0.8392, 0.7137);   // #00D6B6
  const vec3 YELLOW = vec3(1.0, 0.8235, 0.0118);   // #FFD203
  const vec3 ORANGE = vec3(0.9961, 0.3647, 0.0392);// #FE5D0A

  // Unión suave de formas: mantiene una única masa orgánica sin costuras
  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float lobe(vec2 p, vec2 c, float r) {
    return length(p - c) - r;
  }

  void main() {
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 p = vec2((v_uv.x - 0.5) * aspect, v_uv.y - 0.5);
    float t = u_time;

    // ---- Interacción con el cursor (en espacio de pantalla) ------------------------------
    vec2 mp = vec2((u_pointer.x - 0.5) * aspect, (1.0 - u_pointer.y) - 0.5);
    vec2 q = p;
    float md = length(p - mp);
    float influence = 0.0;
    if (u_pointer_active > 0.001) {
      float radius = 0.42 * u_frame.z / 0.4;
      influence = smoothstep(radius, 0.0, md) * u_pointer_active;
      vec2 dir = (p - mp) / max(md, 0.0001);
      // La superficie se aparta suavemente del puntero (hueco elástico) ...
      q -= dir * influence * influence * 0.10;
      // ... y se arrastra en la dirección del movimiento, estirando las zonas de color
      q -= u_pointer_vel * influence * 0.9;
      // Onda breve al pulsar / tocar
      q += dir * sin(md * 30.0 - t * 10.0) * 0.012 * u_ripple * influence;
    }

    // ---- Paso a coordenadas locales de la mancha ----------------------------------------
    float rot = sin(t * 0.21) * 0.06;
    mat2 R = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
    vec2 lp = R * ((q - u_frame.xy) / u_frame.z);

    // Ondulación orgánica continua de la silueta (respiración lenta)
    vec2 warp = vec2(
      sin(lp.y * 2.6 + t * 0.55) * 0.045 + sin(lp.y * 5.1 - t * 0.37) * 0.018,
      cos(lp.x * 2.3 - t * 0.48) * 0.045 + cos(lp.x * 4.7 + t * 0.41) * 0.018
    );
    vec2 sp = lp + warp;

    // ---- Silueta: equivalente a la forma del símbolo del logotipo ------------------------
    // Lóbulo alto a la derecha, vientre central, base derecha y cola redondeada a la izquierda.
    float d = lobe(sp, vec2(0.40 + sin(t * 0.43) * 0.03, 0.30 + cos(t * 0.37) * 0.03), 0.56);
    d = smin(d, lobe(sp, vec2(0.12 + cos(t * 0.31) * 0.02, 0.58 + sin(t * 0.47) * 0.03), 0.30), 0.22);
    d = smin(d, lobe(sp, vec2(-0.04 + sin(t * 0.29) * 0.03, -0.24 + cos(t * 0.41) * 0.02), 0.50), 0.30);
    d = smin(d, lobe(sp, vec2(0.58 + cos(t * 0.39) * 0.03, -0.38 + sin(t * 0.33) * 0.03), 0.42), 0.28);
    d = smin(d, lobe(sp, vec2(-0.50 + sin(t * 0.35) * 0.03, -0.34 + cos(t * 0.45) * 0.02), 0.34), 0.26);
    d = smin(d, lobe(sp, vec2(-0.86 + cos(t * 0.27) * 0.04, -0.46 + sin(t * 0.39) * 0.03), 0.37), 0.24);

    // Antialias en función del tamaño real del píxel
    float px = 1.6 / (u_resolution.y * u_frame.z);
    float mask = 1.0 - smoothstep(-px, px, d);

    // ---- Distribución cromática del logotipo ---------------------------------------------
    // Cada color ocupa una única zona reconocible: aguamarina en la cola izquierda,
    // amarillo en el centro, naranja en el lóbulo superior derecho y azul rey en la base derecha.
    vec2 cp = sp + vec2(sin(sp.y * 3.1 + t * 0.4), cos(sp.x * 2.7 - t * 0.35)) * 0.06;
    vec2 aA = vec2(-0.95, -0.50);
    vec2 aY = vec2(-0.02, 0.16);
    vec2 aO = vec2(0.55, 0.72);
    vec2 aB = vec2(0.70, -0.55);
    float s2 = 0.30;
    float wA = exp(-dot(cp - aA, cp - aA) / s2);
    float wY = exp(-dot(cp - aY, cp - aY) / (s2 * 0.85));
    float wO = exp(-dot(cp - aO, cp - aO) / (s2 * 0.8));
    float wB = exp(-dot(cp - aB, cp - aB) / (s2 * 0.9));
    // Endurecer las transiciones (zonas definidas) sin perder la fusión orgánica
    wA = pow(wA, 1.6); wY = pow(wY, 1.6); wO = pow(wO, 1.6); wB = pow(wB, 1.6);
    float wSum = wA + wY + wO + wB + 1e-5;
    vec3 col = (AQUA * wA + YELLOW * wY + ORANGE * wO + BLUE * wB) / wSum;

    // Volumen sutil: ligero brillo interior y oscurecimiento muy leve hacia el borde
    float inner = smoothstep(0.0, -0.35, d);
    col = mix(col * 0.94, col, inner);
    col += vec3(0.05) * smoothstep(0.25, 0.0, length(sp - vec2(0.15, 0.35))) * inner;

    // Realce suave donde el puntero tensa el material
    col = mix(col, col * 1.06, influence * 0.5);

    gl_FragColor = vec4(mix(WHITE, clamp(col, 0.0, 1.0), mask), 1.0);
  }
`;

/**
 * Encaje de la mancha en la portada (coordenadas de pantalla normalizadas: y ∈ [-0.5, 0.5]).
 * Escritorio: mancha a la derecha, dejando libre la columna del titular.
 * Móvil / vertical: mancha en la mitad superior, el texto queda abajo.
 */
function computeBlobFrame(aspect: number): { cx: number; cy: number; scale: number } {
  const halfW = aspect / 2;
  if (aspect >= 1.05) {
    const scale = Math.min(0.38, aspect * 0.205);
    return { cx: halfW - scale * 0.95 - 0.045, cy: 0.0, scale };
  }
  const scale = Math.min(0.26, aspect * 0.4);
  return { cx: scale * 0.1, cy: 0.5 - scale * 0.95 - 0.06, scale };
}

/**
 * Hero experimental interactivo: una única mancha orgánica cuya distribución cromática
 * sigue la del símbolo del logotipo (aguamarina → amarillo → naranja, con azul rey en la base),
 * sin repetir colores ni crear bandas. No usa ni deforma el logotipo real: solo toma su
 * organización de color como referencia.
 * Reacciona al cursor y al tacto (deformación elástica + arrastre + retorno progresivo).
 */
export const HeroMotionCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerStateRef = useRef({
    targetX: 0.65,
    targetY: 0.5,
    x: 0.65,
    y: 0.5,
    vx: 0,
    vy: 0,
    targetActive: 0,
    active: 0,
    ripple: 0,
  });

  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId = 0;
    const startTime = performance.now();
    const gl = canvas.getContext('webgl', { antialias: true, powerPreference: 'high-performance' });

    const draw2DFallback = (timeSec: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);

      const frame = computeBlobFrame(w / Math.max(1, h));
      const unit = h * frame.scale;
      const ox = w / 2 + frame.cx * h;
      const oy = h / 2 - frame.cy * h;
      const toX = (x: number) => ox + x * unit;
      const toY = (y: number) => oy - y * unit;

      const ps = pointerStateRef.current;
      const px = ps.x * w;
      const py = ps.y * h;

      // Misma silueta que el shader: una sola masa orgánica
      const lobes: [number, number, number, number][] = [
        [0.4, 0.3, 0.56, 0],
        [0.12, 0.58, 0.3, 1.1],
        [-0.04, -0.24, 0.5, 2.2],
        [0.58, -0.38, 0.42, 3.1],
        [-0.5, -0.34, 0.34, 4.0],
        [-0.86, -0.46, 0.37, 5.2],
      ];

      ctx.save();
      ctx.beginPath();
      for (const [lx, ly, lr, ph] of lobes) {
        let cx = toX(lx + Math.sin(timeSec * 0.4 + ph) * 0.03);
        let cy = toY(ly + Math.cos(timeSec * 0.35 + ph) * 0.03);
        const dx = cx - px;
        const dy = cy - py;
        const dist = Math.hypot(dx, dy);
        if (ps.active > 0.05 && dist < unit * 1.2) {
          const k = (1 - dist / (unit * 1.2)) * 18 * ps.active;
          cx += (dx / (dist + 1)) * k;
          cy += (dy / (dist + 1)) * k;
        }
        ctx.moveTo(cx + lr * unit * 1.08, cy);
        ctx.arc(cx, cy, lr * unit * 1.08, 0, Math.PI * 2);
      }
      ctx.clip();

      ctx.fillStyle = '#FFD203';
      ctx.fillRect(0, 0, w, h);
      const zones: [number, number, string][] = [
        [-0.95, -0.5, '0,214,182'],
        [0.55, 0.72, '254,93,10'],
        [0.7, -0.55, '0,66,253'],
      ];
      for (const [zx, zy, rgb] of zones) {
        const g = ctx.createRadialGradient(toX(zx), toY(zy), 0, toX(zx), toY(zy), unit * 0.95);
        g.addColorStop(0, `rgba(${rgb},1)`);
        g.addColorStop(0.45, `rgba(${rgb},0.9)`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.restore();
    };

    if (!gl) {
      const resize2D = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(320, Math.floor(rect.width * dpr));
        canvas.height = Math.max(360, Math.floor(rect.height * dpr));
      };
      resize2D();
      window.addEventListener('resize', resize2D);
      const tick2D = (now: number) => {
        const staticMode = prefersReduced || isPaused;
        const ps = pointerStateRef.current;
        ps.x += (ps.targetX - ps.x) * 0.08;
        ps.y += (ps.targetY - ps.y) * 0.08;
        ps.active += (ps.targetActive - ps.active) * 0.06;
        const t = staticMode ? 4.2 : (now - startTime) * 0.001;
        draw2DFallback(t);
        if (!staticMode) animId = requestAnimationFrame(tick2D);
      };
      animId = requestAnimationFrame(tick2D);
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize2D);
      };
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const pointerLoc = gl.getUniformLocation(program, 'u_pointer');
    const velLoc = gl.getUniformLocation(program, 'u_pointer_vel');
    const pointerActiveLoc = gl.getUniformLocation(program, 'u_pointer_active');
    const rippleLoc = gl.getUniformLocation(program, 'u_ripple');
    const frameLoc = gl.getUniformLocation(program, 'u_frame');

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(320, Math.floor(rect.width * dpr));
      canvas.height = Math.max(360, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (now: number) => {
      const staticMode = prefersReduced || isPaused;
      const t = staticMode ? 6.2 : (now - startTime) * 0.00085;
      const ps = pointerStateRef.current;

      // Interpolación fluida de posición, velocidad y retorno progresivo
      const prevX = ps.x;
      const prevY = ps.y;
      ps.x += (ps.targetX - ps.x) * 0.075;
      ps.y += (ps.targetY - ps.y) * 0.075;
      ps.vx = ps.vx * 0.85 + (ps.x - prevX) * 1.4;
      ps.vy = ps.vy * 0.85 + (ps.y - prevY) * 1.4;
      ps.active += (ps.targetActive - ps.active) * 0.045;
      ps.ripple *= 0.94;

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t);
      gl.uniform2f(pointerLoc, ps.x, ps.y);
      gl.uniform2f(velLoc, ps.vx, -ps.vy);
      gl.uniform1f(pointerActiveLoc, staticMode ? 0.0 : ps.active);
      gl.uniform1f(rippleLoc, staticMode ? 0.0 : ps.ripple);
      const frame = computeBlobFrame(canvas.width / Math.max(1, canvas.height));
      gl.uniform3f(frameLoc, frame.cx, frame.cy, frame.scale);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!staticMode) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [prefersReduced, isPaused]);

  const updatePointerFromEvent = (clientX: number, clientY: number, el: HTMLDivElement, rippleBoost = 0) => {
    const rect = el.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    pointerStateRef.current.targetX = nx;
    pointerStateRef.current.targetY = ny;
    pointerStateRef.current.targetActive = 1;
    if (rippleBoost > 0) {
      pointerStateRef.current.ripple = Math.min(1, pointerStateRef.current.ripple + rippleBoost);
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-white touch-pan-y"
      onPointerMove={(e) => updatePointerFromEvent(e.clientX, e.clientY, e.currentTarget)}
      onPointerDown={(e) => updatePointerFromEvent(e.clientX, e.clientY, e.currentTarget, 0.9)}
      onPointerLeave={() => {
        pointerStateRef.current.targetActive = 0;
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />

      {!prefersReduced && (
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? 'Reanudar animación de portada' : 'Pausar animación de portada'}
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-black text-white text-[11px] font-semibold tracking-wider uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0042FD]"
        >
          {isPaused ? (
            <>
              <Play className="w-3 h-3" aria-hidden="true" />
              <span>Reanudar</span>
            </>
          ) : (
            <>
              <Pause className="w-3 h-3" aria-hidden="true" />
              <span>Pausar</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

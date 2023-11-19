import React, { useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { mat4 } from 'gl-matrix';
import { Footer } from '../../components';

const WindmillPage = () => {
  useEffect(() => {
    document.title = 'Windmill | Computer Graphics';

    const maxSpeed = 0.2;
    let windmillAnimationFrameId: number | null = null;
    let isWindmillRotating = false;
    let rotationAngle = 0;
    let rotationSpeed = 0;
    let rpm = 0;

    let leftMousePressed = false;
    let rightMousePressed = false;

    let lastTimestamp = 0;
    const targetFPS = 120;
    const frameInterval = 1000 / targetFPS;

    function startCanvas(canvas: HTMLCanvasElement) {
      const gl = canvas.getContext('webgl');
      if (!gl) {
        throw new Error('WebGL not supported');
      }

      const vsSource = `
          attribute vec2 a_position;
          uniform mat4 u_modelMatrix;
          void main() {
              gl_Position = u_modelMatrix * vec4(a_position, 0, 1);
              gl_PointSize = 2.0;
          }
      `;

      const fsSource = `
          precision mediump float;
          uniform vec3 u_color;
          void main() {
              gl_FragColor = vec4(u_color, 1.0);
          }
      `;

      const vs = gl.createShader(gl.VERTEX_SHADER);
      if (!vs) {
        throw new Error('Vertex shader could not be created');
      }
      gl.shaderSource(vs, vsSource);
      gl.compileShader(vs);

      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      if (!fs) {
        throw new Error('Fragment shader could not be created');
      }
      gl.shaderSource(fs, fsSource);
      gl.compileShader(fs);

      const program = gl.createProgram();
      if (!program) {
        throw new Error('Program could not be created');
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return { gl, program };
    }

    const windmillCanvas = document.getElementById(
      'windmill-canvas'
    ) as HTMLCanvasElement;
    const windmill = startCanvas(windmillCanvas);
    const { gl } = windmill;
    const { program } = windmill;

    gl.useProgram(program);

    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position'
    );
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color');
    const modelMatrixUniformLocation = gl.getUniformLocation(
      program,
      'u_modelMatrix'
    );

    function generateCircleVertices(
      cx: number,
      cy: number,
      radius: number,
      segments: number
    ) {
      const vertices = [];
      const angleStep = (2 * Math.PI) / segments;

      for (let i = 0; i <= segments; i++) {
        const angle = i * angleStep;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        vertices.push(x, y);
      }

      return vertices;
    }

    function drawShape(
      vertices: Iterable<number>,
      color: number[],
      matrix: mat4 | null = null
    ) {
      if (matrix) {
        gl.uniformMatrix4fv(modelMatrixUniformLocation, false, matrix);
      } else {
        const modelMatrix = mat4.create();
        mat4.identity(modelMatrix);
        gl.uniformMatrix4fv(modelMatrixUniformLocation, false, modelMatrix);
      }

      const positions = new Float32Array(vertices);

      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.uniform3f(colorUniformLocation, color[0], color[1], color[2]);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, positions.length / 2);
    }

    function drawPolygon(
      vertices: number[],
      color: number[],
      modelMatrix: mat4 | null | undefined
    ) {
      drawShape(vertices, color, modelMatrix);
    }

    function drawCircle(
      x: number,
      y: number,
      radius: number,
      color: number[],
      modelMatrix: mat4 | null | undefined
    ) {
      const vertices = generateCircleVertices(x, y, radius, 500);
      drawShape(vertices, color, modelMatrix);
    }

    function updateRotationAngle() {
      rotationAngle += rotationSpeed;
      if (rotationAngle >= 2 * Math.PI || rotationAngle <= -2 * Math.PI) {
        rotationAngle = 0;
      }
    }

    function getBladesMatrix() {
      const bladesMatrix = mat4.create();
      mat4.identity(bladesMatrix);
      mat4.rotateZ(bladesMatrix, bladesMatrix, rotationAngle);
      return bladesMatrix;
    }

    function renderBase() {
      const baseColor = [0.36, 0.25, 0.2];
      const baseVertices = [-0.02, -0.08, 0.02, -0.08, 0.02, -1, -0.02, -1];

      drawPolygon(baseVertices, baseColor, null);
    }

    function renderHub() {
      const hubColor = [1, 1, 1];
      const hub = { x: 0, y: 0, radius: 0.0569 };

      drawCircle(hub.x, hub.y, hub.radius, hubColor, null);
    }

    function renderBlades() {
      const red = [0.8, 0.2, 0.2];
      const darkRed = [0.5, 0.1, 0.1];
      const yellow = [0.9, 0.9, 0.2];
      const darkYellow = [0.5, 0.5, 0.1];
      const green = [0.2, 0.8, 0.2];
      const darkGreen = [0.1, 0.5, 0.1];
      const blue = [0.2, 0.2, 0.8];
      const darkBlue = [0.1, 0.1, 0.5];

      const blade_1_vertices = [0, 0, 0, 0.6, -0.25, 0.2];

      const subBlade_1_vertices = [0, 0, -0.25, 0.2, -0.25, 0];

      const blade_2_vertices = [0, 0, 0.2, 0.25, 0.6, 0];

      const subBlade_2_vertices = [0, 0, 0.2, 0.25, 0, 0.25];

      const blade_3_vertices = [0, 0, 0, -0.6, 0.25, -0.2];

      const subBlade_3_vertices = [0, 0, 0.25, -0.2, 0.25, 0];

      const blade_4_vertices = [0, 0, -0.2, -0.25, -0.6, 0];

      const subBlade_4_vertices = [0, 0, -0.2, -0.25, 0, -0.25];

      const bladesMatrix = getBladesMatrix();
      drawPolygon(blade_1_vertices, red, bladesMatrix);
      drawPolygon(subBlade_1_vertices, darkRed, bladesMatrix);
      drawPolygon(blade_2_vertices, yellow, bladesMatrix);
      drawPolygon(subBlade_2_vertices, darkYellow, bladesMatrix);
      drawPolygon(blade_3_vertices, green, bladesMatrix);
      drawPolygon(subBlade_3_vertices, darkGreen, bladesMatrix);
      drawPolygon(blade_4_vertices, blue, bladesMatrix);
      drawPolygon(subBlade_4_vertices, darkBlue, bladesMatrix);
    }

    function handleLeftClick() {
      if (Math.abs(rotationSpeed) >= maxSpeed) {
        leftMousePressed = false;
      } else if (rotationSpeed < 0) {
        rotationSpeed -= 0.0005;
      } else {
        rotationSpeed += 0.0005;
      }
    }

    function handleRightClick() {
      if (Math.abs(rotationSpeed) < 0.0005) {
        rotationSpeed = 0;
        rightMousePressed = false;
      } else if (rotationSpeed > 0) {
        rotationSpeed -= 0.0005;
      } else if (rotationSpeed < 0) {
        rotationSpeed += 0.0005;
      }
    }

    function handleMouseInput() {
      if (leftMousePressed) {
        handleLeftClick();
      } else if (rightMousePressed) {
        handleRightClick();
      }
    }

    function updateDisplay() {
      const rotationSpeedDisplay = document.getElementById('rotationSpeed');
      if (!rotationSpeedDisplay) return;

      const radiansPerFrame = (rotationSpeed * 60) / (2 * Math.PI);
      rpm = Math.abs(Math.round(radiansPerFrame * 60 * 100) / 100);

      rotationSpeedDisplay.style.color = rpm > 50 ? 'red' : 'black';
      rotationSpeedDisplay.innerHTML = `${rpm} RPM`;
    }

    function renderWindmill(timestamp: number = 0) {
      const elapsed = timestamp - lastTimestamp;

      if (elapsed >= frameInterval) {
        gl.clearColor(0.67, 0.84, 1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (isWindmillRotating) {
          windmillAnimationFrameId = requestAnimationFrame(renderWindmill);
          updateRotationAngle();
          handleMouseInput();
        } else if (windmillAnimationFrameId !== null) {
          cancelAnimationFrame(windmillAnimationFrameId);
        }

        renderBase();
        renderBlades();
        renderHub();

        lastTimestamp = timestamp;
      } else {
        updateDisplay();
        requestAnimationFrame(renderWindmill);
      }
    }

    renderWindmill(0);

    function updateWindmillRotationState() {
      if (isWindmillRotating) {
        windmillAnimationFrameId = requestAnimationFrame(renderWindmill);
      } else if (windmillAnimationFrameId !== null) {
        cancelAnimationFrame(windmillAnimationFrameId);
      }
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') {
        rotationSpeed += rotationSpeed >= maxSpeed ? 0 : 0.005;
        isWindmillRotating = rotationSpeed !== 0;
      } else if (event.key === 'ArrowLeft') {
        rotationSpeed -= rotationSpeed <= -maxSpeed ? 0 : 0.005;
        isWindmillRotating = rotationSpeed !== 0;
      }
      updateWindmillRotationState();
    });

    windmillCanvas?.addEventListener('mousedown', function (event) {
      event.preventDefault();

      if (event.button === 0) {
        leftMousePressed = true;
        rightMousePressed = false;
      } else if (event.button === 2) {
        rightMousePressed = true;
        leftMousePressed = false;
      }
      isWindmillRotating = true;
      updateWindmillRotationState();
    });

    windmillCanvas?.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
  }, []);

  return (
    <div className="bg-raisin">
      <Container className="p-8 bg-raisin  min-h-[88vh]">
        <Breadcrumbs aria-label="breadcrumb" color="white">
          <Link underline="hover" color="inherit" href="/">
            Projects
          </Link>
          <p className="font-semibold text-white">Windmill</p>
        </Breadcrumbs>
        <div className="mb-8 text-4xl font-sans font-semibold text-white text-center mt-4 md:mt-0">
          Windmill
        </div>
        <div className="bg-white rounded-lg w-full md:w-3/5 lg:w-1/2 mx-auto">
          <canvas
            id="windmill-canvas"
            className="aspect-square rounded-t-lg w-full"
            width={1000}
            height={1000}
          />
          <div className="p-4">
            <p
              id="rotationSpeed"
              className="mb-2 transition duration-300 ease-in-out text-2xl font-semibold"
            >
              0 RPM
            </p>
            <p className="font-semibold text-xl mb-3">Controls</p>
            <ul className="list-disc px-4">
              <li>
                Use the arrow keys on the keyboard to increase and decrease the
                speed
              </li>
              <li>Left-click with the mouse to reach maximum speed</li>
              <li>Right-click with the mouse to stop the windmill</li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export { WindmillPage };

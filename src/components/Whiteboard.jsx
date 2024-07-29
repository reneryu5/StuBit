import { useRef, useState, useEffect } from 'react';
import './whiteboard.css';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('pencil'); // 'pencil' or 'eraser'

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : brushColor;
    context.lineWidth = brushSize;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="whiteboard-container">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={800}
        height={600}
        className="whiteboard-canvas"
      />
      <div className="toolbar">
        <button 
          className={`tool-button ${tool === 'pencil' ? 'active' : ''}`} 
          onClick={() => setTool('pencil')}
        >
          Pencil
        </button>
        <button 
          className={`tool-button ${tool === 'eraser' ? 'active' : ''}`} 
          onClick={() => setTool('eraser')}
        >
          Eraser
        </button>
        <input 
          type="color" 
          value={brushColor} 
          onChange={(e) => setBrushColor(e.target.value)} 
          className="color-picker"
        />
        <input 
          type="range" 
          min="1" 
          max="50" 
          value={brushSize} 
          onChange={(e) => setBrushSize(e.target.value)} 
          className="brush-size-slider"
        />
        <button 
          className={`tool-button ${tool === 'clear' ? 'active' : ''}`} 
          onClick={clearCanvas}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Whiteboard;

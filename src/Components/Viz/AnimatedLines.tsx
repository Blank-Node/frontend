import { useEffect, useLayoutEffect, useRef, useReducer } from 'react';

interface Points {
  x: number;
  y: number;
  weight: number;
}
interface Vectors {
  vx: number;
  vy: number;
}
interface State {
  [index: string]: Vectors[] | Points[] | number | null;

  points: Points[];
  current: Vectors[];
  previous: Vectors[];
  index: number | null;
}
interface Action{
  [index: string]: string | number | boolean | HTMLCanvasElement | undefined | null;

  type: string;
  canvas?: HTMLCanvasElement | null;
  number?: number;
}

function randomVecs(number: number) {
  let vectors: Vectors[] = []
  for (let i = 0; i < number; i++) {
    vectors.push({
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
    })
  }
  return vectors
}
function randomPoints(number: number | undefined, canvas: HTMLCanvasElement | undefined | null) {
  let points: Points[] = []
  if (canvas && number) {    
    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize points
    if (!Boolean(points.length)) {
      for (let i = 0; i < number; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          weight: Math.random() // Random weight between 0 and 1
        });
      }
    }
  }
  return points
}

function reducer(state: State, action: Action) {
  if (action.type === 'setPoints') {
    return {
      ...state,
      points: randomPoints(action.number, action.canvas)
    }
  } else if (action.type === 'move') {    
    if (action.canvas) {
      const width = action.canvas.width
      const height = action.canvas.height
      const ctx = action.canvas.getContext('2d');
      
      state.points.forEach((point, i) => {
        state.points[i].x += state.current[i].vx
        state.points[i].y += state.current[i].vy

        // Bounce off walls
        if (point.x < 0 || point.x > width - 60) {
          state.current[i].vx *= -1;
        }
        if (point.y < 0 || point.y > height - 60) {
          state.current[i].vy *= -1;
        }
      });

      if (ctx) {
        ctx?.clearRect(0, 0, width, height);
        // Draw lines between points with color gradient based on weight
        for (let i = 0; i < state.points.length; i++) {
          for (let j = i + 1; j < state.points.length; j++) {
            const weight1 = state.points[i].weight;
            const weight2 = state.points[j].weight;
            const gradient = ctx?.createLinearGradient(state.points[i].x, state.points[i].y, state.points[j].x, state.points[j].y);
            gradient?.addColorStop(0, `rgba(0, 80, 100, ${1 - weight1})`); // Darker color for lower weight
            gradient?.addColorStop(1, `rgba(100, 240, 200, ${1 - weight2})`); // Lighter color for higher weight
            
            ctx?.beginPath();
            ctx?.moveTo(state.points[i].x, state.points[i].y);
            ctx?.lineTo(state.points[j].x, state.points[j].y);
            ctx.strokeStyle = gradient;
            ctx?.stroke();
          }
        }
      }
    }
    return {
      ...state,
      previous: state.index !== null ? state.previous : [...state.current],
    }
  } else if (action.type === 'pause') {
    return {
      ...state,
      current: state.current.map((v, i) => {
        if (i === action.i) {
          return { vx: 0, vy: 0 }
        }
        return v
      }),
      index: Number(action.i)
    }
  } else if (action.type === 'resume') {    
    return {
      ...state,
      current: state.previous.map((v, i) => {
        if (i === state.index) {
          return { vx: v.vx, vy: v.vy }
        }
        return v
      }),
      index: null
    }
  } else {
    return state
  }
}

const AnimatedLines = ({ numPoints=6, radius=100 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initState: State = {
    points: [],
    current: randomVecs(numPoints),
    previous: [],
    index: null,
  }
  const [state, dispatch] = useReducer(reducer,initState)
  
  useLayoutEffect(() => {
    dispatch({type: "setPoints", canvas: canvasRef.current, number: numPoints})
    if (canvasRef.current) {
    }
  }, [])
  
  useEffect(() => {
    if (canvasRef.current) {      
      const animate = () => {
        requestAnimationFrame(animate);
        dispatch({type: 'move', canvas: canvasRef.current})
      }; 
      animate();
    }
    // Cleanup
    return () => {};
  }, []); 
  
  const handleMouseMove = (event: any) => {
    // console.log(event)
    const canvas = event.target;
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;    

    if (Boolean(state.points.length)) {
      if (state.index === null) {
        for (let i = 0; i < numPoints; i++) {
          const distance = Math.sqrt(Math.pow(mouseX - state.points[i].x, 2) + Math.pow(mouseY - state.points[i].y, 2));
          if (distance <= radius ) {  
            dispatch({type: 'pause', i})
            break;
          } 
        }
      } else {
        const distance = Math.sqrt(Math.pow(mouseX - state.points[state.index].x, 2) + Math.pow(mouseY - state.points[state.index].y, 2));
        if (distance > radius ) { 
          dispatch({type: 'resume'})
        }
      }
    }
  };

  return <canvas id={'2dCanvas'} className='full-size' ref={canvasRef} onMouseMove={handleMouseMove}/>
};

export default AnimatedLines

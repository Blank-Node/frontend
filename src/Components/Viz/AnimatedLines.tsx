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
  [index: string]: Vectors[] | Points[] | boolean;

  points: Points[];
  current: Vectors[];
  previous: Vectors[];
  paused: boolean;
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

    return state
  } else if (action.type === 'bounce') {
    return {
      ...state
    }
  } else if (action.type === 'pause') {
    return {
      ...state
    }
  } else if (action.type === 'resume') {
    return {
      ...state
    }
  } else {
    return state
  }
}

const AnimatedLines = ({ numPoints=6, radius=80, buffer=40 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initState: State = {
    points: [],
    current: randomVecs(numPoints),
    previous: [],
    paused: false
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

    // if (Boolean(state.points.length)) {
    //   if (!state.paused) {
    //     for (let i = 0; i < numPoints; i++) {
    //       const distance = Math.sqrt(Math.pow(mouseX - points[i].x, 2) + Math.pow(mouseY - points[i].y, 2));
    //       if (distance <= radius ) {    
    //         vectRef.current.forEach(vector => {
    //           vector.vx = 0
    //           vector.vy = 0
    //         })          
            
    //         console.log(vectRef.current);
    //         console.log('PREV ----',vectPrevRef.current);
            
    //         break;
    //       } 
    //     }
    //   } else { console.log('paused', vectRef.current === vectPrevRef.current);
    //   }
    // }

  };

  return <canvas id={'2dCanvas'} className='full-size' ref={canvasRef} onMouseMove={handleMouseMove}/>
};

export default AnimatedLines

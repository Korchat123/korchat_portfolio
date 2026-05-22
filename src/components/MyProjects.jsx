import { useState,useEffect } from 'react'


export default function MyProjects(){

const [projectsMessages, setProjectsMessages] = useState([]);

const fullProjectsMessages = [
    "Project 1:$ Portfolio Website $ A personal portfolio website built with React and Tailwind CSS to showcase my skills and projects.",
    "Project 2:$ Cookies Clicker App $ A Cookie Clicker game built with React and Tailwind CSS.",
    "Project 3:$ E-commerce Platform $ An e-commerce platform created with MERN stack (MongoDB, Express, React, Node.js) to facilitate restaurant ordering."
];




useEffect(  () => {

    let index = 0;
    const interval =  setInterval(() => {       
        setProjectsMessages(prevMessages => {
            
            const newMessages = [...prevMessages];  
            if (index < fullProjectsMessages.length) {
                newMessages[index] = fullProjectsMessages[index];
                index++;
            } 
            
            return newMessages;
        }
    );console.log(projectsMessages);
    return clearTimeout(interval);    
    }, 5000);
    
    
    }, []);



    return (

       
        <div className="flex flex-col bg-gray-700 text-green-400 w-[80vw] h-fit ml-[20vw] p-4">
        {projectsMessages.map((message, index) => (
            <div key={index}>
                <h1 className="text-2xl font-bold mb-4">{message.split('$')[0]}</h1>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">{message.split('$')[1]}</h2>
                    <p className="text-gray-300">{message.split('$')[2]}</p>
                 {/* <p>github</p><p>website</p> */}
            </div>
            </div>
            ))}
            {/* <div className="mb-4">
                <h2 className="text-xl font-semibold">Project 2: Cookies Clicker App</h2>
                <p className="text-gray-300">A Cookie Clicker game built with React and Tailwind CSS.</p>
                <p>github</p>
                <p>website</p>  
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Project 3: E-commerce Platform</h2>
                <p className="text-gray-300">An e-commerce platform created with MERN stack (MongoDB, Express, React, Node.js) to facilitate online shopping.</p>
                <p>github</p>
                <p>website</p>
            </div> */}
        </div>
    )   




}
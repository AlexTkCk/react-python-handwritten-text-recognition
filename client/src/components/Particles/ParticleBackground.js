import React, { useEffect, useState } from 'react';
import {config} from "./particlesConfig";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
    const [ init, setInit ] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (init && <Particles id={'tsparticles'}  options={config} className={'h-screen w-screen absolute -z-10'}/>)
};

export default ParticleBackground;
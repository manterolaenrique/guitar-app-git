"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Guitar } from 'lucide-react';


const TituloAnimado = () => {
    return (
      <div className="titulo-container">
        <motion.h1
          className="titulo titulo-rock"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Guitar className="guitar-icon left" />
          <span className="titulo-text">Herramientas de Guitarra</span>
          <Guitar className="guitar-icon right" />
        </motion.h1>
        
      </div>
    );
  };

export default TituloAnimado;

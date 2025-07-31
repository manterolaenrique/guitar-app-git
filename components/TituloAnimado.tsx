"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Guitar, Music, Mic } from 'lucide-react';

const TituloAnimado = () => {
    return (
      <motion.div 
        className="titulo-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="titulo-wrapper"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="titulo-icons"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <Music className="icon-left" />
            <Guitar className="icon-center" />
            <Mic className="icon-right" />
          </motion.div>
          
          <motion.h1
            className="titulo-principal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            <span className="titulo-text">GuitarFlow</span>
          </motion.h1>
          
          <motion.p
            className="titulo-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            Herramientas de Guitarra Modernas
          </motion.p>
        </motion.div>
      </motion.div>
    );
  };

export default TituloAnimado;

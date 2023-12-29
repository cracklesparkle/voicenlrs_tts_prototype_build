import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { FaPlayCircle, FaPauseCircle, FaPause, FaPlay } from 'react-icons/fa'
import styles from './Waveform.module.scss'
import { motion } from 'framer-motion'
const Waveform = ({ audio }) => {
    const containerRef = useRef(null)
    const waveSurferRef = useRef({
        isPlaying: () => false
    })

    const [isPlaying, toggleIsPlaying] = useState(false)


    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            responsive: true,
            cursorWidth: 0,
            barWidth: 5,
            barHeight: 1,
            barRadius: 15,
            width: 300,
            progressColor: 'rgb(61, 106, 231)'
        })
        waveSurfer.load(audio)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
        })
        waveSurfer.on('finish', () => {
            toggleIsPlaying(false)
        })
        return () => {
            waveSurfer.destroy()
        }
    }, [audio])

    return <div className={styles.wavesurfer_wrap}>
        <button onClick={() => {
            waveSurferRef.current.playPause()
            toggleIsPlaying(waveSurferRef.current.isPlaying())
        }
        }
            type="button">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.990 }}
            >
                {isPlaying ? <FaPause color='rgb(61, 106, 231)' size="3em" /> : <FaPlay color='white' size="3em" />}
            </motion.div>
        </button>
        <div ref={containerRef} />
    </div>
}

export default Waveform

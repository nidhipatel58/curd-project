import React, { Component } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

class LoadingButton extends Component {
    render() {  
        const { loading, buttonName, onClick } = this.props;

        return (
            <button
                onClick={onClick}
                disabled={loading}
                className="relative flex items-center justify-center w-40 h-12 text-white bg-blue-600 rounded-full transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </motion.div>
                ) : (
                    buttonName
                )}
            </button>
        );
    }
}

export default LoadingButton;
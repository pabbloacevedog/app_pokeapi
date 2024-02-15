module.exports = {
    presets: [
        "@babel/preset-env", // Transpila ES6+ a ES5
        "@babel/preset-react", // Añade soporte para JSX
        "@babel/preset-typescript", // Añade soporte para TypeScript
    ],
    plugins: [
        "@babel/plugin-transform-runtime", // Reutiliza el código de ayuda de Babel para ahorrar en tamaño de código
        "@babel/plugin-proposal-class-properties", // Permite propiedades de clase estáticas y propiedades de instancia de clase
        "@babel/plugin-proposal-object-rest-spread", // Permite la sintaxis de propagación y reposo para objetos
    ],
};

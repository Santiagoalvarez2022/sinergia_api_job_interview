const normalizeText= (text) => {
    return text
        // Elimina saltos de línea duplicados
        .replace(/\n{2,}/g, '\n')
        // Elimina espacios en blanco al inicio y al final de cada línea
        .replace(/^\s+|\s+$/gm, '')
        // Sustituye múltiples espacios entre palabras por un solo espacio
        .replace(/\s{2,}/g, ' ')
        // Elimina cualquier espacio adicional al principio y al final del texto
        .trim();
}

module.exports = normalizeText;
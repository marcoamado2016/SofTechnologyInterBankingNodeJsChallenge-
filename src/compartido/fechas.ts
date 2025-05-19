export function mesActualYUltimo() {
    let hoy = new Date();
    let anioActual = hoy.getFullYear();
    let ultimoMes = new Date(anioActual, hoy.getMonth() - 1, 1);
    let mesActual = new Date(anioActual, hoy.getMonth(), 1)
    return { ultimoMes, mesActual };
}
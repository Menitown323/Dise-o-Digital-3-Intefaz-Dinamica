class Figura {
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea) {
        this.inicio_x = inicio_x;
        this.inicio_y = inicio_y;
        this.fin_x = fin_x;
        this.fin_y = fin_y;
        this.posicion_x = Math.min(inicio_x, fin_x);
        this.posicion_y = Math.min(inicio_y, fin_y);
        this.color_linea = color_linea;
        this.color_relleno = color_relleno;
        this.grozor_linea = grozor_linea;
    }
}

export class Cuadrado extends Figura {
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea) {
        super(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea);
        this.ancho = Math.abs(fin_x - inicio_x);
        this.alto = Math.abs(fin_y - inicio_y);
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;
        ctx.fillStyle = this.color_relleno;

        ctx.fillRect(this.posicion_x, this.posicion_y, this.ancho, this.alto);
        ctx.strokeRect(this.posicion_x, this.posicion_y, this.ancho, this.alto);
    }
}

export class Circulo extends Figura {
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea) {
        super(inicio_x, inicio_y, fin_x, fin_y, color_linea, color_relleno, grozor_linea);
        this.radio = Math.sqrt((fin_x - inicio_x) ** 2 + (fin_y - inicio_y) ** 2);
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;
        ctx.fillStyle = this.color_relleno;

        ctx.arc(this.inicio_x, this.inicio_y, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

export class Linea extends Figura {
    constructor(inicio_x, inicio_y, fin_x, fin_y, color_linea, grozor_linea) {
        super(inicio_x, inicio_y, fin_x, fin_y, color_linea, null, grozor_linea);
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;

        ctx.moveTo(this.inicio_x, this.inicio_y);
        ctx.lineTo(this.fin_x, this.fin_y);
        ctx.stroke();
    }
}

export class Sticker {
    constructor(posicion_x, posicion_y, fin_x, fin_y, url_imagen) {

        this.posicion_x = Math.min(posicion_x, fin_x);
        this.posicion_y = Math.min(posicion_y, fin_y);

        this.ancho = Math.abs(fin_x - posicion_x);
        this.alto = Math.abs(fin_y - posicion_y);

        this.imagen = new Image();
        this.imagen.src = url_imagen;
    }

    dibujar(ctx) {
        if (this.imagen.complete) {
            ctx.drawImage(this.imagen, this.posicion_x, this.posicion_y, this.ancho, this.alto);
        } else {
            this.imagen.onload = () => {
                ctx.drawImage(this.imagen, this.posicion_x, this.posicion_y, this.ancho, this.alto);
            };
        }
    }
}


//Circulo, linea y figura
export default class Anuncio{
    constructor (data={
        id:0,
        name:'',
        price:0,
        image:'',
        address:'',
        final:1,
        type:1
    }){
        this.id      = data.id
        this.name    = data.name
        this.price   = data.price
        this.image   = data.image
        this.address = data.address
        this.final   = data.final
        this.type    = data.type
    }
    isValidWithOutId(){
        return this.name && this.image && this.price > 0 && this.address && this.final > 0 && (this.type >0 && this.type < 3)
    }
    convertTypeToText() {
        switch(this.type){
            case 1:
                return 'Casa'
            case 2:
                return 'Apartamento'
            case 3:
                return 'Comércio'
            default:
                return 'Inválido'
        }
    }
}
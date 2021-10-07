$(function() {
    $('#ct,#cd,#dd,#dt').change(function() {
        document.getElementById("pp_nome1").value = "EloBoost do " + $('#ct option:selected').html() + " " + $('#cd option:selected').html() + " ao " + $('#dt option:selected').html() + " " + $('#dd option:selected').html();
        document.getElementById("text-job").innerHTML = "➜ EloBoosting: " + $('#ct option:selected').html() + " (divisão " + $('#cd option:selected').html() + ") até " + $('#dt option:selected').html() + " (divisão " + $('#dd option:selected').html() + ")";
        if (document.getElementById("dt").value == "m") {
            $("#dd").html('<option value="1">1</option>');
        } else {
            if (document.getElementById("dd").value == "1") {
                $("#dd").html('<option value="1" selected>1</option><option value="2">2</option><option value="3">3</option></option><option value="4">4</option>');
            } else if (document.getElementById("dd").value == "2") {
                $("#dd").html('<option value="1" >1</option><option value="2" selected>2</option><option value="3">3</option></option><option value="4">4</option>');
            } else if (document.getElementById("dd").value == "3") {
                $("#dd").html('<option value="1" >1</option><option value="2" >2</option><option value="3" selected>3</option><option value="4">4</option>');
            } else if (document.getElementById("dd").value == "4") {
                $("#dd").html('<option value="1" >1</option><option value="2" >2</option><option value="3" >3</option><option value="4" selected>4</option>');
            }
        }

    });
});



function EloEvolution(attrs) {
    var image_path = '';
    this._products = {

        f4: {
            id: 0,
            price: 0,
            image: image_path + '../assets/img/Ferro/4.png'
        },

        f3: {
            id: 968,
            price: 5,
            image: image_path + '../assets/img/Ferro/3.png'
        },

        f2: {
            id: 969,
            price: 5,
            image: image_path + '../assets/img/Ferro/2.png'
        },

        f1: {
            id: 970,
            price: 5,
            image: image_path + '../assets/img/Ferro/1.png'
        },

        b4: {
            id: 971,
            price: 5,
            image: image_path + '../assets/img/Bronze/4.png'
        },

        b3: {
            id: 972,
            price: 10,
            image: image_path + '../assets/img/Bronze/3.png'
        },

        b2: {
            id: 973,
            price: 10,
            image: image_path + '../assets/img/Bronze/2.png'
        },

        b1: {
            id: 974,
            price: 10,
            image: image_path + '../assets/img/Bronze/1.png'
        },

        s4: {
            id: 976,
            price: 10,
            image: image_path + '../assets/img/Prata/4.png'
        },

        s3: {
            id: 977,
            price: 14,
            image: image_path + '../assets/img/Prata/3.png'
        },

        s2: {
            id: 978,
            price: 14,
            image: image_path + '../assets/img/Prata/2.png'
        },

        s1: {
            id: 979,
            price: 14,
            image: image_path + '../assets/img/Prata/1.png'
        },

        g4: {
            id: 981,
            price: 14,
            image: image_path + '../assets/img/Ouro/4.png'
        },

        g3: {
            id: 982,
            price: 20,
            image: image_path + '../assets/img/Ouro/3.png'
        },

        g2: {
            id: 983,
            price: 20,
            image: image_path + '../assets/img/Ouro/2.png'
        },

        g1: {
            id: 984,
            price: 20,
            image: image_path + '../assets/img/Ouro/1.png'
        },

        p4: {
            id: 986,
            price: 20,
            image: image_path + '../assets/img/Platina/4.png'
        },

        p3: {
            id: 987,
            price: 30,
            image: image_path + '../assets/img/Platina/3.png'
        },

        p2: {
            id: 989,
            price: 30,
            image: image_path + '../assets/img/Platina/2.png'
        },

        p1: {
            id: 990,
            price: 30,
            image: image_path + '../assets/img/Platina/1.png'
        },

        d4: {
            id: 1597,
            price: 30,
            image: image_path + '../assets/img/Diamante/4.png'
        },

        d3: {
            id: 1770,
            price: 80,
            image: image_path + '../assets/img/Diamante/3.png'
        },

        d2: {
            id: 1771,
            price: 90,
            image: image_path + '../assets/img/Diamante/2.png'
        },

        d1: {
            id: 1772,
            price: 100,
            image: image_path + '../assets/img/Diamante/1.png'
        },
        m1: {
            id: 1773,
            price: 120,
            image: image_path + '../assets/img/Mestre/1.png'
        }
    };

    this.currencyFormat = 'R$';
    this.currencyDecimalSeparator = ',';

    this._errorMessages = {
        dest_lt_cur: "Elo menor que o atual"
    }

    this._sequence = [
        'f4', 'f3', 'f2', 'f1',
        'b4', 'b3', 'b2', 'b1',
        's4', 's3', 's2', 's1',
        'g4', 'g3', 'g2', 'g1',
        'p4', 'p3', 'p2', 'p1',
        'd4', 'd3', 'd2', 'd1',
        'm1'
    ];

    this.errors = [];

    this.settings = function(attrs) {
        for (var key in attrs) {
            this[key] = attrs[key];
        }
        this._attachAddToCart();
        return this;
    }

    this.change = function() {
        this.ck = $(this.selectCurrentTier).val() + $(this.selectCurrentDivision).val();
        this.dk = $(this.selectDestinationTier).val() + $(this.selectDestinationDivision).val();
        this.current = this._products[this.ck];
        this.destination = this._products[this.dk];
        this.updateImage();
        var price = 0;
        price = this.sumValue();
        $(this.priceContainer).text(this._formatCurrency(price));
        document.getElementById("pp_valor1").value = price;
        if (!price) {
            $('#text-value').html("<b>➜ Valor do pedido: <span class='text-danger'>Pedido inválido</span></b>");
            $('#btn-buy').attr('disabled', true);
        } else {
            $('#text-value').html("<b>➜ Valor do pedido: <span class='text-success'>R$" + price + ",00</span></b>");
            $('#btn-buy').attr('disabled', false);
        }
        atual = this.ck;
        destino = this.dk;
        return this;
    }

    this.updateImage = function() {
        $(this.currentWrapImage).attr('src', this.current.image);
        $(this.destinationWrapImage).attr('src', this.destination.image);
    }

    this.sumValue = function() {
        this._getSequence();
        if (this.i_dest < this.i_cur) {
            this._addError('dest_gt_cur');
            return false;
        }
        var sum = 0;
        this._execInSequence(function(p, k) {
            sum += p.price;
        });
        return sum;
    }

    this.errorMessages = function() {
        var trErrors = [];
        for (var i = 0; i < this.errors.length; i++) {
            var k = this.errors[i];
            if (this._errorMessages[k]) {
                trErrors.push(this._errorMessages[k]);
            } else {
                trErrors.push(k);
            }
            return trErrors;
        }
    }

    this._getSequence = function() {
        for (var i = 0; i < this._sequence.length; i++) {
            if (this.ck === this._sequence[i]) {
                this.i_cur = i;
            }
            if (this.dk === this._sequence[i]) {
                this.i_dest = i;
            }
        }
    }

    this._execInSequence = function(func) {
        for (var i = this.i_cur + 1; i <= this.i_dest; i++) {
            var p_key = this._sequence[i];
            var product = this._products[p_key];
            func(product, p_key);
        }
    }

    this._formatCurrency = function(val) {
        var o = [];
        var decPart = new String(parseInt((val - parseInt(val)) * Math.pow(10, this._currencyDecimalQty)) || 0);
        var intPart = new String(parseInt(val) || 0);
        if (decPart < 10) {
            decPart = "0" + decPart;
        }
        o.push(this.currencyFormat);
        o.push(' ')
        o.push(intPart);
        o.push(this.currencyDecimalSeparator);
        o.push(decPart);
        return o.join('');
    }

    this._attachAddToCart = function() {
        var evo = this;
        jQuery(evo.addToCartButton).click(function() {
            evo.addToCart();
        });
    }

    this._addError = function(err) {
        this.errors.push(err);
    }

    this.init = function(attrs) {
        if (attrs) {
            this.settings(attrs);
        }
    }
    this.init(attrs);
}

$(function() {
    var evo = new EloEvolution({
        selectCurrentTier: '#bt',
        selectCurrentTier: '#ct',
        selectCurrentDivision: '#cd',
        selectDestinationTier: '#dt',
        selectDestinationDivision: '#dd',
        currentWrapImage: '#cti',
        destinationWrapImage: '#dti',
        priceContainer: '#price',
        changeDetails: '#details',
        addToCartButton: '#cart',
        addToCartUrl: '',
        cartUrl: '/carrinho',
        beforeAddToCart: function() {
            jQuery('#loader').show();
        }
    });
    $('#ct,#cd,#dt,#dd,#bt').change(function() {
        evo.change();
    });
});
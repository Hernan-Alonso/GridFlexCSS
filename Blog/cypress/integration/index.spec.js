describe('Visit the page and funcionality correct', ()=>{
    it('first nav bar should have class navegacion and be visible',()=>{
        cy.visit('http://127.0.0.1:5500/Blog/')
        cy.url().should('include','/Blog')
        cy.get("nav")
            .first()
            .should('be.visible')
            .and('have.class', 'navegacion')
    });
    it('navbar navegacion should have 4 lis',()=>{
        cy.get('.navegacion>ul>li')
            .should('not.be.empty')
            .and(($li)=>{
                expect($li).to.have.length(4)
            });
    });
    it('navbar lists should be Inicio, Noticias, Blog and Contacto',()=>{
        let contentNav = ['Inicio', 'Noticias', 'Blog', 'Contacto']
        cy.get('.navegacion>ul>li')
            .then(($li)=>{
               $li.each((index,$el)=>{
                   expect($el.innerText).to.contain(contentNav[index]);
               })
            })
    });
    it('Header del contenido debe ser "Ultimas Entradas"', ()=>{
        cy.get('.contenido-principal')
            .find('h2')
            .should('not.be.empty')
            .and(($h2)=>{
                expect($h2).contain('Últimas Entradas')
            })
    });
    it('Buttons of articles should be read as Leer Mas',()=>{
        cy.get('.entrada')
            .find('a')
            .then(($link)=>{
                $link.each((index, $el, $lis)=>{
                    expect($el.innerText).contain('LEER MÁS')
                })
            })
    })
    it('categories should be visible', ()=>{
       cy.get('.categorias')
            .should('be.visible')
    })
    it('Las lista de categorias deben ser Actividades, Festivales, Restaurantes y Tips', () => {
        let categorias = ['Actividades', 'Festivales', 'Restaurantes', 'Tips']
        cy.get('.categorias')
            .find('li')
            .then(($li)=>{
                $li.each((index,$el)=>{
                    expect($el.innerText).to.contain(categorias[index]);
                })
            })
    });
    it('footer debe verse', () => {
        cy.get('.footer')
            .should('be.visible')
    });
    it('nosotros debe contener texto', () => {
        cy.get('.nosotros')
            .find('p')
            .and(($p)=>{
                expect($p).to.not.be.empty;
            })
    });
    it('entradas debe contener texto', () => {
        cy.get('.nosotros')
            .find('ul')
            .and(($ul)=>{
                expect($ul).to.not.be.empty;
            })
    });
    it('sociales debe contener texto', () => {
        cy.get('.nosotros')
            .find('ul')
            .and(($ul)=>{
                expect($ul).to.not.be.empty;
            })
    });
    it('los colores de la pagina principales deben ser #008fd1',()=>{
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
          }
        let rgbHex = hexToRgb('#008fd1');
        let rgbToCompare = 'rgb('+rgbHex.r+', '+rgbHex.g+', '+rgbHex.b+')';
        cy.get('.barra')
            .should('have.css', 'background-color', rgbToCompare)

        cy.get('.contenedor>h1')
        .should('have.css', 'color', rgbToCompare)
        
        cy.get('.entrada')
            .find('a')
            .then(($a)=>{
                $a.each((index,$el)=>{
                   cy.get($el).should('have.css','background-color', rgbToCompare)
                })
            })

        cy.get('.categorias')
            .find('li').first()
            .should('have.css', 'background-color', rgbToCompare)
        cy.get('.footer')
            .should('have.css', 'background-color', rgbToCompare)
    });
    it('copyright visible', () => {
        cy.get('.copyright')
            .should('be.visible')
            .invoke('text')
            .should('match', /Hernan Alonso$/i)
    });
})
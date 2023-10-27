const VELOCIDAD = 50;

$(document).ready(function() {
    let robot = $("#robot");
    let currentDegree = 0;

    $("#start").click(async function() {
        let instructions = $("#instructions").val().split(";");
        for (let i = 0; i < instructions.length; i++) {
            let instruction = instructions[i].trim();
            if (instruction.startsWith("moverAdelante")) {
                let seconds = getParameter(instruction);
                await moveRobot('forward', seconds);
            } else if (instruction.startsWith("moverAtras")) {
                let seconds = getParameter(instruction);
                await moveRobot('backward', seconds);
            } else if (instruction.startsWith("girarDerecha")) {
                let degrees = getParameter(instruction);
                await rotateRobot('right', degrees);
            } else if (instruction.startsWith("girarIzquierda")) {
                let degrees = getParameter(instruction);
                await rotateRobot('left', degrees);
            }
        }
    });

    function getParameter(instruction) {
        return parseFloat(instruction.split("(")[1]);
    }

    function moveRobot(direction, seconds) {
        return new Promise((resolve) => {
            let movement = VELOCIDAD * seconds;
            let currentPosition = robot.position();
    
            let dx = movement * Math.sin(currentDegree * Math.PI / 180);
            let dy = -movement * Math.cos(currentDegree * Math.PI / 180);
    
            if (direction === 'backward') {
                dx = -dx;
                dy = -dy;
            }
    
            robot.animate({
                left: currentPosition.left + dx,
                top: currentPosition.top + dy
            }, seconds * 1000, resolve);
        });
    }
    

    function rotateRobot(direction, degrees) {
        return new Promise((resolve) => {
            let startDegree = currentDegree;

            switch(direction) {
                case 'right':
                    currentDegree += degrees;
                    break;
                case 'left':
                    currentDegree -= degrees;
                    break;
            }

            $({deg: startDegree}).animate({deg: currentDegree}, {
                duration: 1000,
                step: function(now) {
                    robot.css('transform', 'rotate(' + now + 'deg)');
                },
                complete: resolve
            });
        });
    }

    $('#background-choice').change(function() {
        var selectedBackground = $(this).val();
        switch(selectedBackground) {
            case 'background1':
                $('.field').css('background-image', 'url("/fondo-carretera.jpg")');
                break;
            case 'background2':
                $('.field').css('background-image', 'url("/fondo-2.png")');
                break;
            case 'background3':
                $('.field').css('background-image', 'url("fondo-cuadricula.jpg")');
                break;
            default:
                $('.field').css('background-image', ''); // Fondo por defecto o puedes poner otro
                break;
        }
    });
    

    
});

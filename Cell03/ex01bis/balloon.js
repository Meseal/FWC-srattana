$(document).ready(function() {
    const $balloon = $('#balloon');
    let size = 200;
    const colors = ['red', 'green', 'blue'];
    let colorIndex = 0;

    function updateBalloon() {
        $balloon.css({
            'width': size + 'px',
            'height': size + 'px',
            'background-color': colors[colorIndex]
        });
    }

    $balloon.on('click', function() {
        size += 10;
        if (size > 420) {
            size = 200;
            colorIndex = 0;
        } else {
            colorIndex = (colorIndex + 1) % colors.length;
        }
        updateBalloon();
    });

    $balloon.on('mouseleave', function() {
        if (size > 200) {
            size -= 5;
            if (size < 200) {
                size = 200;
            }
            colorIndex = (colorIndex - 1 + colors.length) % colors.length;
            updateBalloon();
        }
    });
});
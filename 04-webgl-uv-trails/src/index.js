import WindGL from './wind-gl.js';
// import * as d3 from './src/d3+jetpack.js';

// console.log(d3);
// using var to work around a WebKit bug
var canvas = document.getElementById('canvas'); // eslint-disable-line

const pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const gl = canvas.getContext('webgl', {antialiasing: false});

const wind = window.wind = new WindGL(gl);
wind.numParticles = 65536;

// console.log(wind);

function frame() {
    if (wind.windData) {
        wind.draw();
    }
    requestAnimationFrame(frame);
}
frame();
const windFiles = {
    0: '2016112000',
    6: '2016112006',
    12: '2016112012',
    18: '2016112018',
    24: '2016112100',
    30: '2016112106',
    36: '2016112112',
    42: '2016112118',
    48: '2016112200'
};

const meta = {
    '2016-11-20+h': 0,
    'retina resolution': true,
};

updateWind(0);
updateRetina();

function updateRetina() {
    const ratio = meta['retina resolution'] ? pxRatio : 1;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    wind.resize();
}

// getJSON('./data/ne_110m_coastline_robinson.json', function (data) {
getJSON('./data/ne_110m_coastline.geojson', function (data) {

    // const canvas = document.getElementById('coastline');
    // canvas.width = canvas.clientWidth * pxRatio;
    // canvas.height = canvas.clientHeight * pxRatio;

    // const ctx = canvas.getContext('2d');
    // ctx.lineWidth = pxRatio;
    // ctx.lineJoin = ctx.lineCap = 'round';
    // ctx.strokeStyle = 'white';
    // ctx.beginPath();

    // for (let i = 0; i < data.features.length; i++) {
    //     const line = data.features[i].geometry.coordinates;
    //     for (let j = 0; j < line.length; j++) {
    //         ctx[j ? 'lineTo' : 'moveTo'](
    //             (line[j][0] + 180) * canvas.width / 360,
    //             (-line[j][1] + 90) * canvas.height / 180);
    //     }
    //     // console.log(line);
    // }

    // ctx.stroke();
});

function updateWind(name) {
    getJSON('./data/' + windFiles[name] + '.json', function (windData) {
        const windImage = new Image();
        windData.image = windImage;
        windImage.src = 'data/' + windFiles[name] + '-54030.png';
        windImage.onload = function () {
            wind.setWind(windData);
        };
    });
}

function getJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('get', url, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(xhr.response);
        } else {
            throw new Error(xhr.statusText);
        }
    };
    xhr.send();
}

document.addEventListener("DOMContentLoaded", async function () {
    async function getStockRecommendation() {
        try {
            const stockSymbols = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT"];
            const randomStock = stockSymbols[Math.floor(Math.random() * stockSymbols.length)];
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${randomStock}&token=cu26d8pr01ql7sc76tm0cu26d8pr01ql7sc76tmg`);
            const data = await response.json();
            document.getElementById("stock-symbol").textContent = randomStock;
            document.getElementById("stock-price").textContent = `$${data.c}`;
            document.getElementById("stock-reason").textContent = `${randomStock} is trending based on recent market analysis.`;
        } catch (error) {
            document.getElementById("stock-symbol").textContent = "N/A";
            document.getElementById("stock-price").textContent = "$0.00";
            document.getElementById("stock-reason").textContent = "Error fetching data.";
        }
    }
    document.getElementById("refresh-btn").addEventListener("click", getStockRecommendation);
    getStockRecommendation();
});

// Three.js 3D Background Effect with Interactive Rotation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("threejs-canvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xff0055, metalness: 0.8, roughness: 0.3 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Mouse interaction for 3D effect
document.addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    torusKnot.rotation.x = y * Math.PI * 0.1;
    torusKnot.rotation.y = x * Math.PI * 0.1;
});

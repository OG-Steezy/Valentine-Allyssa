const hiBtn = document.getElementById("hiBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const heartsContainer = document.getElementById("heartsContainer");

let heartsInterval = null;
let noActivated = false;

// Show Screen 2
hiBtn.addEventListener("click", () => {
  document.getElementById("screen1").classList.add("hidden");
  document.getElementById("screen2").classList.remove("hidden");

  // Reset NO button position
  noBtn.style.position = "relative";
  noBtn.style.top = "0px";
  noBtn.style.left = "0px";

  // Slightly offset it so it's not under the cursor
  setTimeout(() => {
    noBtn.style.position = "absolute";
    noBtn.style.top = "60%";
    noBtn.style.left = "60%";
  }, 50);
});

// YES button
yesBtn.addEventListener("click", () => {
  message.textContent = "💙Perfect baby, I knew you would say yes❣ I can't wait to see you❣";

  document.body.classList.add("love-mode");

  const song = document.getElementById("romanticSong");

  // Try to play the audio and catch any errors
  song.play().then(() => {
    console.log("Audio started playing successfully");
  }).catch((error) => {
    console.error("Error playing the audio:", error);
  });

  if (!heartsInterval) {
    heartsInterval = setInterval(createHeart, 300);
  }
});

// Floating hearts function
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "0px";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000); // Hearts disappear after 4 seconds
}

// When "No" button is hovered over, it starts moving
noBtn.addEventListener("mouseenter", () => {
  noActivated = true;
  
  // Add shake effect when mouse enters button
  noBtn.classList.add("shake");

  // Remove shake effect after animation completes
  setTimeout(() => {
    noBtn.classList.remove("shake");
  }, 500); // Matches the animation duration
});

// Add mousemove event listener to make the "No" button move
document.addEventListener("mousemove", (e) => {
  if (!noActivated) return;

  // Get the button's bounding rect
  const rect = noBtn.getBoundingClientRect();
  
  // Calculate the distance from the center of the button to the mouse
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  // If the mouse is near the button (distance less than 80px), move it
  if (distance < 80) {
    noBtn.style.position = "absolute";
    noBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";
    noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
  }
});

// Game data with self-contained games
const games = [
    {
        id: 1,
        name: "Snake Classic",
        description: "The classic snake game. Eat food and grow longer without hitting walls!",
        category: ["arcade"],
        tags: ["Arcade", "Classic"],
        icon: "🐍",
        type: "inline",
        instructions: "Use arrow keys to control the snake. Eat food to grow longer. Don't hit walls or yourself!"
    },
    {
        id: 2,
        name: "Tic Tac Toe",
        description: "Classic X and O game. Beat the AI in this strategic battle!",
        category: ["strategy"],
        tags: ["Strategy", "2 Player"],
        icon: "⭕",
        type: "inline",
        instructions: "Click to place X. Get three in a row to win against our smart AI!"
    },
    {
        id: 3,
        name: "Memory Match",
        description: "Test your memory with this card matching game. Find all pairs!",
        category: ["puzzle"],
        tags: ["Memory", "Brain"],
        icon: "🎴",
        type: "inline",
        instructions: "Click cards to flip them. Find matching pairs in as few moves as possible!"
    },
    {
        id: 4,
        name: "2048 Puzzle",
        description: "Combine tiles to reach 2048. Addictive number puzzle game!",
        category: ["puzzle"],
        tags: ["Puzzle", "Numbers"],
        icon: "🧩",
        type: "inline",
        instructions: "Use arrow keys to move tiles. Combine same numbers to create 2048!"
    },
    {
        id: 5,
        name: "Rock Paper Scissors",
        description: "Classic hand game against the computer. Best of 5 wins!",
        category: ["strategy"],
        tags: ["Classic", "Quick"],
        icon: "✂️",
        type: "inline",
        instructions: "Choose rock, paper, or scissors. Beat the computer in this classic game!"
    },
    {
        id: 6,
        name: "Color Match",
        description: "Fast-paced color matching game. Test your reflexes!",
        category: ["arcade"],
        tags: ["Reflex", "Colors"],
        icon: "🎨",
        type: "inline",
        instructions: "Click the color that matches the word, not the text color. Be quick!"
    },
    {
        id: 7,
        name: "Number Guesser",
        description: "Guess the number in fewest attempts. Can you beat 5 tries?",
        category: ["puzzle"],
       tags: ["Logic", "Numbers"],
        icon: "🔢",
        type: "inline",
        instructions: "Guess the number between 1-100. We'll tell you if it's higher or lower!"
    },
    {
        id: 8,
        name: "Reaction Test",
        description: "Test your reaction speed. How fast can you click?",
        category: ["arcade"],
        tags: ["Reflex", "Speed"],
        icon: "⚡",
        type: "inline",
        instructions: "Click the circle as soon as it appears. Test your reaction time!"
    },
    {
        id: 9,
        name: "Chess Master AI",
        description: "Play classic Chess against a Minimax AI. Can you beat the computer?",
        category: ["strategy"],
        tags: ["Strategy", "Brain"],
        icon: "♔",
        type: "inline",
        instructions: "Click a piece to select it, then click a valid square to move. Win by checkmating the Black King!"
    }
];

// DOM elements
const gameGrid = document.querySelector('.game-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');
const gameModal = document.getElementById('gameModal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.getElementById('modalBody');
const contactForm = document.getElementById('contactForm');

// Initialize variables
let currentFilter = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderGames();
    setupEventListeners();
    createParticles();
});

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(this);
            filterGames(filter);
        });
    });
    
    // Mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Game modal
    if (closeModal) {
        closeModal.addEventListener('click', closeGameModal);
    }
    
    // Close modal when clicking outside
    if (gameModal) {
        gameModal.addEventListener('click', function(e) {
            if (e.target === gameModal) {
                closeGameModal();
            }
        });
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Navigation highlighting on scroll
    window.addEventListener('scroll', highlightNavOnScroll);
}

// Render games to the grid
function renderGames(filteredGames = null) {
    const gamesToRender = filteredGames || games;
    
    gameGrid.innerHTML = '';
    
    if (gamesToRender.length === 0) {
        gameGrid.innerHTML = '<p class="no-games">No games found matching your criteria.</p>';
        return;
    }
    
    gamesToRender.forEach(game => {
        const gameCard = createGameCard(game);
        gameGrid.appendChild(gameCard);
    });
}

// Create a game card element
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('data-category', game.category.join(' '));
    
    card.innerHTML = `
        <div class="game-image">
            <span>${game.icon}</span>
        </div>
        <div class="game-info">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="game-tags">
                ${game.tags.map(tag => `<span class="game-tag">${tag}</span>`).join('')}
            </div>
            <br><a href="#" class="play-btn" data-game-id="${game.id}">Play Now</a>
        </div>
    `;
    
    // Add click event to play button
    const playBtn = card.querySelector('.play-btn');
    playBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openGameModal(game);
    });
    
    return card;
}

// Set active filter button
function setActiveFilter(activeButton) {
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Filter games by category
function filterGames(filter) {
    currentFilter = filter;
    
    if (filter === 'all') {
        renderGames();
        return;
    }
    
    const filteredGames = games.filter(game => 
        game.category.includes(filter)
    );
    
    renderGames(filteredGames);
}

// Toggle mobile menu
function toggleMobileMenu() {
    nav.classList.toggle('active');
}

// Open game modal
function openGameModal(game) {
    let gameContent = '';
    
    // Remove any existing scroll classes first
    gameModal.classList.remove('scrollable-modal');
    
    // Add scrollable class only for Tic Tac Toe (id: 2) and Memory Match (id: 3)
    if (game.id === 2 || game.id === 3) {
        gameModal.classList.add('scrollable-modal');
    }
    
    switch(game.id) {
        case 1:
            gameContent = createSnakeGame();
            break;
        case 2:
            gameContent = createTicTacToeGame();
            break;
        case 3:
            gameContent = createMemoryGame();
            break;
        case 4:
            gameContent = create2048Game();
            break;
        case 5:
            gameContent = createRockPaperScissorsGame();
            break;
        case 6:
            gameContent = createColorMatchGame();
            break;
        case 7:
            gameContent = createNumberGuesserGame();
            break;
        case 8:
            gameContent = createReactionTestGame();
            break;
        case 9:
            gameContent = createChessGame();
            break;
    }
    
    modalBody.innerHTML = `
        <h2>${game.name}</h2>
        <p><strong>Instructions:</strong> ${game.instructions}</p>
        ${gameContent}
    `;
    
    gameModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Initialize the specific game
    setTimeout(() => initializeGame(game.id), 100);
}

// Close game modal
function closeGameModal() {
    gameModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    gameModal.classList.remove('scrollable-modal'); // Remove scroll class
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
    contactForm.reset();
}

// Highlight navigation on scroll
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    }
}

// Particle System
function createParticles() {
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
        particle.style.setProperty('--opacity', Math.random() * 0.5 + 0.2);
        
        // Random color from theme palette
        const colors = ['#dc2626', '#06b6d4', '#1e40af', '#7c3aed'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 6000);
    };
    
    // Create particles periodically
    setInterval(createParticle, 200);
}

// ========== GAME IMPLEMENTATIONS ==========

function initializeGame(gameId) {
    switch(gameId) {
        case 1:
            initSnakeGame();
            break;
        case 2:
            initTicTacToeGame();
            break;
        case 3:
            initMemoryGame();
            break;
        case 4:
            init2048Game();
            break;
        case 5:
            initRockPaperScissorsGame();
            break;
        case 6:
            initColorMatchGame();
            break;
        case 7:
            initNumberGuesserGame();
            break;
        case 8:
            initReactionTestGame();
            break;
        case 9:
            initChessGame();
            break;
    }
}

// Game 1: Snake
function createSnakeGame() {
    return `
        <div class="inline-game">
            <div class="game-controls">
                <div class="game-stats">
                    <div>Score: <span id="snakeScore">0</span></div>
                    <div>High Score: <span id="snakeHighScore">0</span></div>
                </div>
                <button class="btn-secondary" onclick="resetSnakeGame()">Restart Game</button>
            </div>
            <canvas id="snakeCanvas" width="400" height="400"></canvas>
        </div>
    `;
}

function initSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('snakeScore');
    const highScoreElement = document.getElementById('snakeHighScore');
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 0;
    let dy = 0;
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    let gameRunning = true;
    
    highScoreElement.textContent = highScore;
    
    function gameLoop() {
        if (!gameRunning) return;
        
        if (checkGameOver()) {
            gameRunning = false;
            setTimeout(() => alert(`Game Over! Your score: ${score}`), 100);
            return;
        }
        
        clearCanvas();
        moveSnake();
        drawFood();
        drawSnake();
        
        setTimeout(gameLoop, 100);
    }
    
    function clearCanvas() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function drawSnake() {
        ctx.fillStyle = '#dc2626';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize-2, gridSize-2);
        });
    }
    
    function drawFood() {
        ctx.fillStyle = '#06b6d4';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-2, gridSize-2);
    }
    
    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = highScore;
                localStorage.setItem('snakeHighScore', highScore);
            }
            generateFood();
        } else {
            snake.pop();
        }
    }
    
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Make sure food doesn't spawn on snake
        if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            generateFood();
        }
    }
    
    function checkGameOver() {
        const head = snake[0];
        
        // Hit wall
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            return true;
        }
        
        // Hit self
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        
        return false;
    }
    
    window.resetSnakeGame = function() {
        snake = [{x: 10, y: 10}];
        dx = 0;
        dy = 0;
        score = 0;
        scoreElement.textContent = score;
        gameRunning = true;
        generateFood();
        gameLoop();
    };
    
    // Controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && dy !== 1) {
            dx = 0;
            dy = -1;
        } else if (e.key === 'ArrowDown' && dy !== -1) {
            dx = 0;
            dy = 1;
        } else if (e.key === 'ArrowLeft' && dx !== 1) {
            dx = -1;
            dy = 0;
        } else if (e.key === 'ArrowRight' && dx !== -1) {
            dx = 1;
            dy = 0;
        }
    });
    
    // Start game
    resetSnakeGame();
}

// Game 2: Tic Tac Toe
function createTicTacToeGame() {
    return `
        <div class="inline-game">
            <div class="game-controls">
                <div class="game-stats">
                    <div id="tttStatus">Your turn (X)</div>
                </div>
                <button class="btn-secondary" onclick="resetTicTacToeGame()">New Game</button>
            </div>
            <div class="ttt-board" id="ticTacToeBoard">
                <div class="ttt-cell" data-index="0"></div>
                <div class="ttt-cell" data-index="1"></div>
                <div class="ttt-cell" data-index="2"></div>
                <div class="ttt-cell" data-index="3"></div>
                <div class="ttt-cell" data-index="4"></div>
                <div class="ttt-cell" data-index="5"></div>
                <div class="ttt-cell" data-index="6"></div>
                <div class="ttt-cell" data-index="7"></div>
                <div class="ttt-cell" data-index="8"></div>
            </div>
        </div>
    `;
}

function initTicTacToeGame() {
    const board = document.getElementById('ticTacToeBoard');
    const status = document.getElementById('tttStatus');
    
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));
        
        if (gameBoard[cellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Player move
        gameBoard[cellIndex] = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        
        if (checkWinner()) {
            status.textContent = 'You win! 🎉';
            gameActive = false;
            return;
        }
        
        if (isBoardFull()) {
            status.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
        }
        
        // Switch to AI
        currentPlayer = 'O';
        status.textContent = "AI's turn (O)";
        
        // AI move
        setTimeout(makeAIMove, 500);
    }
    
    function makeAIMove() {
        if (!gameActive) return;
        
        // Simple AI: find first available spot
        let availableSpots = gameBoard.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
        
        if (availableSpots.length > 0) {
            const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
            gameBoard[randomSpot] = 'O';
            const cell = document.querySelector(`.ttt-cell[data-index="${randomSpot}"]`);
            cell.classList.add('o');
            
            if (checkWinner()) {
                status.textContent = 'AI wins! 🤖';
                gameActive = false;
                return;
            }
            
            if (isBoardFull()) {
                status.textContent = 'Game ended in a draw!';
                gameActive = false;
                return;
            }
            
            currentPlayer = 'X';
            status.textContent = 'Your turn (X)';
        }
    }
    
    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }
        return false;
    }
    
    function isBoardFull() {
        return gameBoard.every(cell => cell !== '');
    }
    
    window.resetTicTacToeGame = function() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = 'Your turn (X)';
        
        document.querySelectorAll('.ttt-cell').forEach(cell => {
            cell.classList.remove('x', 'o');
        });
    };
    
    // Add event listeners
    document.querySelectorAll('.ttt-cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

// Game 3: Memory Match
function createMemoryGame() {
    return `
        <div class="inline-game memory-game-container">
            <div class="game-controls">
                <div class="game-stats">
                    <div>Moves: <span id="memoryMoves">0</span></div>
                    <div>Pairs: <span id="memoryPairs">0</span>/8</div>
                </div>
                <button class="btn-secondary" onclick="resetMemoryGame()">New Game</button>
            </div>
            <div class="memory-board" id="memoryBoard"></div>
        </div>
    `;
}

function initMemoryGame() {
    const board = document.getElementById('memoryBoard');
    const movesElement = document.getElementById('memoryMoves');
    const pairsElement = document.getElementById('memoryPairs');
    
    const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    let cards = [...symbols, ...symbols];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let canFlip = true;
    
    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }
    
    function createBoard() {
        board.innerHTML = '';
        shuffleCards();
        
        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.innerHTML = `
                <div class="front">${symbol}</div>
                <div class="back">?</div>
            `;
            card.addEventListener('click', () => flipCard(card, index));
            board.appendChild(card);
        });
    }
    
    function flipCard(card, index) {
        if (!canFlip || card.classList.contains('flipped') || flippedCards.length >= 2) {
            return;
        }
        
        card.classList.add('flipped');
        flippedCards.push({ card, symbol: cards[index], index });
        
        if (flippedCards.length === 2) {
            moves++;
            movesElement.textContent = moves;
            canFlip = false;
            
            checkForMatch();
        }
    }
    
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.symbol === card2.symbol) {
            // Match found
            matchedPairs++;
            pairsElement.textContent = matchedPairs;
            flippedCards = [];
            canFlip = true;
            
            if (matchedPairs === symbols.length) {
                setTimeout(() => {
                    alert(`Congratulations! You won in ${moves} moves!`);
                }, 500);
            }
        } else {
            // No match
            setTimeout(() => {
                card1.card.classList.remove('flipped');
                card2.card.classList.remove('flipped');
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
    
    window.resetMemoryGame = function() {
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        movesElement.textContent = '0';
        pairsElement.textContent = '0';
        canFlip = true;
        createBoard();
    };
    
    // Initialize game
    resetMemoryGame();
}

// Game 4: 2048
function create2048Game() {
    return `
        <div class="inline-game game-2048-container">
            <div class="game-controls">
                <div class="game-stats">
                    <div>Score: <span id="score2048">0</span></div>
                    <div>Best: <span id="best2048">0</span></div>
                </div>
                <button class="btn-secondary" onclick="reset2048Game()">New Game</button>
            </div>
            <div id="game2048Grid" class="game-2048-grid"></div>
            <p>Use arrow keys to move tiles</p>
        </div>
    `;
}

function init2048Game() {
    const gridDisplay = document.getElementById('game2048Grid');
    const scoreDisplay = document.getElementById('score2048');
    const bestDisplay = document.getElementById('best2048');
    
    const grid = [];
    const gridSize = 4;
    let score = 0;
    let best = localStorage.getItem('2048Best') || 0;
    
    bestDisplay.textContent = best;
    
    function createGrid() {
        gridDisplay.innerHTML = '';
        grid.length = 0;
        
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            gridDisplay.appendChild(cell);
            grid.push(0);
        }
        
        addNumber();
        addNumber();
        updateDisplay();
    }
    
    function addNumber() {
        const emptyCells = grid.map((cell, index) => cell === 0 ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[randomCell] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    
    function updateDisplay() {
        grid.forEach((cell, index) => {
            const gridCell = gridDisplay.children[index];
            gridCell.textContent = cell === 0 ? '' : cell;
            gridCell.className = 'grid-cell';
            if (cell > 0) {
                gridCell.classList.add(`tile-${cell}`);
            }
        });
        
        scoreDisplay.textContent = score;
        if (score > best) {
            best = score;
            bestDisplay.textContent = best;
            localStorage.setItem('2048Best', best);
        }
    }
    
    function move(direction) {
        let moved = false;
        
        for (let i = 0; i < gridSize; i++) {
            const row = [];
            for (let j = 0; j < gridSize; j++) {
                const index = direction === 'left' || direction === 'right' 
                    ? i * gridSize + j 
                    : j * gridSize + i;
                row.push(grid[index]);
            }
            
            const filteredRow = direction === 'left' || direction === 'up' 
                ? row.filter(num => num !== 0)
                : row.filter(num => num !== 0).reverse();
            
            for (let j = 0; j < filteredRow.length - 1; j++) {
                if (filteredRow[j] === filteredRow[j + 1]) {
                    filteredRow[j] *= 2;
                    filteredRow[j + 1] = 0;
                    score += filteredRow[j];
                    moved = true;
                }
            }
            
            const newRow = filteredRow.filter(num => num !== 0);
            while (newRow.length < gridSize) {
                newRow.push(0);
            }
            
            if (direction === 'right' || direction === 'down') {
                newRow.reverse();
            }
            
            for (let j = 0; j < gridSize; j++) {
                const index = direction === 'left' || direction === 'right' 
                    ? i * gridSize + j 
                    : j * gridSize + i;
                if (grid[index] !== newRow[j]) {
                    moved = true;
                }
                grid[index] = newRow[j];
            }
        }
        
        if (moved) {
            addNumber();
            updateDisplay();
            checkGameOver();
        }
    }
    
    function checkGameOver() {
        if (!grid.includes(0)) {
            // Check if any moves are possible
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const current = grid[i * gridSize + j];
                    if (j < gridSize - 1 && current === grid[i * gridSize + j + 1]) return;
                    if (i < gridSize - 1 && current === grid[(i + 1) * gridSize + j]) return;
                }
            }
            setTimeout(() => alert('Game Over!'), 100);
        }
    }
    
    window.reset2048Game = function() {
        score = 0;
        createGrid();
    };
    
    // Controls
    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            const direction = e.key.replace('Arrow', '').toLowerCase();
            move(direction);
        }
    });
    
    // Start game
    reset2048Game();
}

// Game 5: Rock Paper Scissors
function createRockPaperScissorsGame() {
    return `
        <div class="inline-game">
            <div class="game-controls">
                <div class="game-stats">
                    <div>Score: <span id="rpsScore">0</span></div>
                    <div>Round: <span id="rpsRound">1</span>/5</div>
                </div>
                <button class="btn-secondary" onclick="resetRPSGame()">New Game</button>
            </div>
            <div style="margin: 20px 0; font-size: 4rem;" id="rpsChoices">
                ❔ vs ❔
            </div>
            <div style="margin: 20px 0;">
                <button class="btn-primary" onclick="playRPS('rock')">🪨 Rock</button>
                <button class="btn-primary" onclick="playRPS('paper')">📄 Paper</button>
                <button class="btn-primary" onclick="playRPS('scissors')">✂️ Scissors</button>
            </div>
            <div id="rpsResult" style="font-size: 1.2rem; margin: 10px 0;"></div>
        </div>
    `;
}

function initRockPaperScissorsGame() {
    window.playRPS = function(playerChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        const emoji = {
            rock: '🪨',
            paper: '📄', 
            scissors: '✂️'
        };
        
        document.getElementById('rpsChoices').textContent = 
            `${emoji[playerChoice]} vs ${emoji[computerChoice]}`;
        
        let result = '';
        if (playerChoice === computerChoice) {
            result = "It's a tie!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result = "You win this round! 🎉";
            updateRPSScore(1);
        } else {
            result = "Computer wins this round! 🤖";
            updateRPSScore(-1);
        }
        
        document.getElementById('rpsResult').textContent = result;
        updateRPSRound();
    };
    
    window.resetRPSGame = function() {
        document.getElementById('rpsScore').textContent = '0';
        document.getElementById('rpsRound').textContent = '1';
        document.getElementById('rpsChoices').textContent = '❔ vs ❔';
        document.getElementById('rpsResult').textContent = '';
        rpsData = { score: 0, round: 1 };
    };
    
    let rpsData = { score: 0, round: 1 };
    
    function updateRPSScore(points) {
        rpsData.score += points;
        document.getElementById('rpsScore').textContent = rpsData.score;
    }
    
    function updateRPSRound() {
        rpsData.round++;
        document.getElementById('rpsRound').textContent = rpsData.round;
        
        if (rpsData.round > 5) {
            setTimeout(() => {
                const message = rpsData.score > 0 ? "You won the game! 🎉" : 
                              rpsData.score < 0 ? "Computer won the game! 🤖" : 
                              "It's a tie game!";
                alert(`Game Over! ${message} Final score: ${rpsData.score}`);
                resetRPSGame();
            }, 500);
        }
    }
}

// Game 6: Color Match
function createColorMatchGame() {
    return `
        <div class="inline-game">
            <div class="game-controls">
                <div class="game-stats">
                    <div>Score: <span id="colorScore">0</span></div>
                    <div>Time: <span id="colorTime">30</span>s</div>
                </div>
                <button class="btn-secondary" onclick="resetColorGame()">New Game</button>
            </div>
            <div id="colorDisplay" style="font-size: 2rem; margin: 20px 0; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                Ready?
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; max-width: 300px; margin: 0 auto;">
                <button class="btn-primary" style="font-size: 1.2rem; padding: 15px;" onclick="colorChoice('red')">Red</button>
                <button class="btn-primary" style="font-size: 1.2rem; padding: 15px;" onclick="colorChoice('blue')">Blue</button>
                <button class="btn-primary" style="font-size: 1.2rem; padding: 15px;" onclick="colorChoice('green')">Green</button>
                <button class="btn-primary" style="font-size: 1.2rem; padding: 15px;" onclick="colorChoice('yellow')">Yellow</button>
            </div>
            <div id="colorResult" style="margin: 10px 0;"></div>
        </div>
    `;
}

function initColorMatchGame() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const colorMap = {
        red: '#dc2626',
        blue: '#1e40af', 
        green: '#16a34a',
        yellow: '#eab308'
    };
    
    let currentColor = '';
    let currentWord = '';
    let score = 0;
    let timeLeft = 30;
    let gameTimer;
    
    function generateChallenge() {
        currentColor = colors[Math.floor(Math.random() * colors.length)];
        currentWord = colors[Math.floor(Math.random() * colors.length)];
        
        const display = document.getElementById('colorDisplay');
        display.textContent = currentWord.toUpperCase();
        display.style.color = colorMap[currentColor];
    }
    
    window.colorChoice = function(choice) {
        // Player wins if they click the COLOR, not the word
        if (choice === currentColor) {
            score += 10;
            document.getElementById('colorScore').textContent = score;
            document.getElementById('colorResult').textContent = "Correct! +10 points";
            document.getElementById('colorResult').style.color = '#16a34a';
        } else {
            document.getElementById('colorResult').textContent = "Wrong! The color was " + currentColor;
            document.getElementById('colorResult').style.color = '#dc2626';
        }
        
        generateChallenge();
    };
    
    window.resetColorGame = function() {
        clearInterval(gameTimer);
        score = 0;
        timeLeft = 30;
        document.getElementById('colorScore').textContent = '0';
        document.getElementById('colorTime').textContent = '30';
        document.getElementById('colorResult').textContent = '';
        startColorGame();
    };
    
    function startColorGame() {
        generateChallenge();
        
        gameTimer = setInterval(() => {
            timeLeft--;
            document.getElementById('colorTime').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                alert(`Time's up! Your score: ${score}`);
                resetColorGame();
            }
        }, 1000);
    }
    
    startColorGame();
}

// Game 7: Number Guesser
function createNumberGuesserGame() {
    return `
        <div class="inline-game">
            <div class="game-controls">
                <div class="game-stats">
                    <div>Attempts: <span id="guessAttempts">0</span></div>
                    <div>Best: <span id="guessBest">-</span></div>
                </div>
                <button class="btn-secondary" onclick="resetGuessGame()">New Game</button>
            </div>
            <div style="margin: 20px 0;">
                <p>I'm thinking of a number between 1 and 100</p>
                <input type="number" id="guessInput" min="1" max="100" placeholder="Enter your guess" style="padding: 10px; font-size: 1.2rem; width: 150px; margin-right: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: white;">
                <button class="btn-primary" onclick="submitGuess()">Guess</button>
            </div>
            <div id="guessResult" style="font-size: 1.2rem; margin: 10px 0; min-height: 60px;"></div>
            <div id="guessHistory" style="margin: 10px 0;"></div>
        </div>
    `;
}

function initNumberGuesserGame() {
    let targetNumber = 0;
    let attempts = 0;
    let bestScore = localStorage.getItem('numberGuessBest') || '-';
    let guessHistory = [];
    
    document.getElementById('guessBest').textContent = bestScore;
    
    function startNewGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        guessHistory = [];
        document.getElementById('guessAttempts').textContent = '0';
        document.getElementById('guessResult').textContent = '';
        document.getElementById('guessHistory').innerHTML = '';
        document.getElementById('guessInput').value = '';
    }
    
    window.submitGuess = function() {
        const input = document.getElementById('guessInput');
        const guess = parseInt(input.value);
        
        if (isNaN(guess) || guess < 1 || guess > 100) {
            document.getElementById('guessResult').textContent = 'Please enter a number between 1 and 100';
            return;
        }
        
        attempts++;
        document.getElementById('guessAttempts').textContent = attempts;
        
        guessHistory.push(guess);
        document.getElementById('guessHistory').innerHTML = 
            'Previous guesses: ' + guessHistory.join(', ');
        
        if (guess === targetNumber) {
            document.getElementById('guessResult').innerHTML = 
                `🎉 Correct! The number was ${targetNumber}. You guessed it in ${attempts} attempts!`;
            
            if (bestScore === '-' || attempts < bestScore) {
                bestScore = attempts;
                document.getElementById('guessBest').textContent = bestScore;
                localStorage.setItem('numberGuessBest', bestScore);
            }
            
            setTimeout(startNewGame, 3000);
        } else if (guess < targetNumber) {
            document.getElementById('guessResult').textContent = 'Too low! Try a higher number.';
        } else {
            document.getElementById('guessResult').textContent = 'Too high! Try a lower number.';
        }
        
        input.value = '';
        input.focus();
    };
    
    window.resetGuessGame = function() {
        startNewGame();
    };
    
    // Enter key support
    document.getElementById('guessInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitGuess();
        }
    });
    
    startNewGame();
}

// Game 8: Reaction Test
function createReactionTestGame() {
    return `
        <div class="inline-game">
            <div class="game-controls">
                <div class="game-stats">
                    <div>Best: <span id="reactionBest">-</span>ms</div>
                    <div>Average: <span id="reactionAvg">-</span>ms</div>
                </div>
                <button class="btn-secondary" onclick="resetReactionGame()">New Game</button>
            </div>
            <div id="reactionCircle" style="width: 200px; height: 200px; background: var(--primary); border-radius: 50%; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; cursor: pointer; opacity: 0;">
                Click when I appear!
            </div>
            <div id="reactionResult" style="margin: 10px 0; font-size: 1.2rem;"></div>
            <div id="reactionHistory" style="margin: 10px 0;"></div>
        </div>
    `;
}

function initReactionTestGame() {
    const circle = document.getElementById('reactionCircle');
    const result = document.getElementById('reactionResult');
    const history = document.getElementById('reactionHistory');
    const bestDisplay = document.getElementById('reactionBest');
    const avgDisplay = document.getElementById('reactionAvg');
    
    let startTime;
    let reactionTimes = [];
    let bestTime = localStorage.getItem('reactionBest') || '-';
    let gameActive = false;
    
    bestDisplay.textContent = bestTime;
    
    function startRound() {
        gameActive = false;
        circle.style.opacity = '0';
        result.textContent = 'Wait for the circle to appear...';
        
        const delay = Math.random() * 3000 + 1000; // 1-4 seconds
        
        setTimeout(() => {
            if (!gameActive) {
                gameActive = true;
                startTime = Date.now();
                circle.style.opacity = '1';
                circle.style.background = 'var(--primary)';
                result.textContent = 'Click now!';
            }
        }, delay);
    }
    
    circle.addEventListener('click', function() {
        if (!gameActive) {
            result.textContent = 'Too soon! Wait for the circle.';
            circle.style.background = '#dc2626';
            setTimeout(startRound, 1000);
            return;
        }
        
        const reactionTime = Date.now() - startTime;
        reactionTimes.push(reactionTime);
        
        result.textContent = `Reaction time: ${reactionTime}ms`;
        
        // Update best time
        if (bestTime === '-' || reactionTime < bestTime) {
            bestTime = reactionTime;
            bestDisplay.textContent = bestTime;
            localStorage.setItem('reactionBest', bestTime);
        }
        
        // Calculate average
        const average = Math.round(reactionTimes.reduce((a, b) => a + b) / reactionTimes.length);
        avgDisplay.textContent = average + 'ms';
        
        // Update history
        history.innerHTML = `Last 5: ${reactionTimes.slice(-5).join('ms, ')}ms`;
        
        // Visual feedback
        circle.style.background = '#16a34a';
        
        // Next round
        setTimeout(startRound, 1000);
    });
    
    window.resetReactionGame = function() {
        reactionTimes = [];
        avgDisplay.textContent = '-';
        history.innerHTML = '';
        result.textContent = '';
        startRound();
    };
    
    startRound();
}

// Game 9: Chess Master AI
function createChessGame() {
    return `
        <div class="inline-game chess-game-container">
            <div class="game-controls" style="flex-wrap: wrap; gap: 15px;">
                <div class="color-selection">
                    <label style="margin-right: 15px; cursor: pointer;">
                        <input type="radio" name="chessColor" value="w" checked onchange="changeChessColor('w')"> Play as White
                    </label>
                    <label style="cursor: pointer;">
                        <input type="radio" name="chessColor" value="b" onchange="changeChessColor('b')"> Play as Black
                    </label>
                </div>
                <div class="game-stats chess-stats">
                    <div id="chessStatus">Your turn (White)</div>
                </div>
                <button class="btn-secondary" onclick="resetChessGame()">New Game</button>
            </div>
            <div class="chess-board-wrapper">
                <div id="chessBoard" class="chess-board"></div>
            </div>
        </div>
    `;
}

function initChessGame() {
    const boardElement = document.getElementById('chessBoard');
    const statusElement = document.getElementById('chessStatus');
    
    if (typeof Chess === 'undefined') {
        boardElement.innerHTML = '<p style="color:red; text-align:center; padding: 20px;">Error loading Chess engine. Please check your internet connection.</p>';
        return;
    }

    let game = new Chess();
    let selectedSquare = null;
    let possibleMoves = [];
    let playerColor = 'w';
    let isThinking = false;

    // Unicode pieces map
    const piecesMap = {
        'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
        'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
    };

    function renderBoard() {
        boardElement.innerHTML = '';
        const board = game.board();
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                // If player is white, r=0 is rank 8 (top).
                // If player is black, r=0 is rank 1 (top).
                const r = playerColor === 'w' ? row : 7 - row;
                const c = playerColor === 'w' ? col : 7 - col;
                
                // Determine file (a-h) and rank (1-8)
                const file = String.fromCharCode('a'.charCodeAt(0) + c);
                const rank = 8 - r;
                const squareName = file + rank;
                
                const isDark = (r + c) % 2 !== 0; // standard chess board coloring
                
                const squareEl = document.createElement('div');
                squareEl.className = `chess-square ${isDark ? 'dark' : 'light'}`;
                
                if (selectedSquare === squareName) {
                    squareEl.classList.add('selected');
                }
                
                if (possibleMoves.some(m => m.to === squareName)) {
                    squareEl.classList.add('possible-move');
                }

                squareEl.dataset.square = squareName;
                
                const piece = board[r][c];
                if (piece) {
                    const pieceChar = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
                    squareEl.innerHTML = `<span class="chess-piece ${piece.color}">${piecesMap[pieceChar]}</span>`;
                }

                squareEl.addEventListener('click', () => handleSquareClick(squareName));
                boardElement.appendChild(squareEl);
            }
        }
        updateStatus();
    }

    function handleSquareClick(square) {
        if (game.game_over() || game.turn() !== playerColor || isThinking) return;

        if (selectedSquare) {
            // Re-clicking selected square -> unselect
            if (selectedSquare === square) {
                selectedSquare = null;
                possibleMoves = [];
                renderBoard();
                return;
            }

            const move = possibleMoves.find(m => m.to === square);
            if (move) {
                // Move is valid
                if (move.flags.includes('p') || move.flags.includes('cp')) {
                    game.move({ from: selectedSquare, to: square, promotion: 'q' });
                } else {
                    game.move({ from: selectedSquare, to: square });
                }
                
                selectedSquare = null;
                possibleMoves = [];
                renderBoard();
                
                if (!game.game_over()) {
                    isThinking = true;
                    statusElement.textContent = "AI is thinking...";
                    setTimeout(makeAIMove, 200);
                }
            } else {
                // Clicked a different square that is not a valid move.
                // If it's another of player's pieces, select it instead.
                const piece = game.get(square);
                if (piece && piece.color === game.turn()) {
                    selectedSquare = square;
                    possibleMoves = game.moves({ square: square, verbose: true });
                } else {
                    selectedSquare = null;
                    possibleMoves = [];
                }
                renderBoard();
            }
        } else {
            const piece = game.get(square);
            if (piece && piece.color === game.turn()) {
                selectedSquare = square;
                possibleMoves = game.moves({ square: square, verbose: true });
                renderBoard();
            }
        }
    }

    function updateStatus() {
        let status = '';
        let moveColor = game.turn() === 'w' ? 'White' : 'Black';

        if (game.in_checkmate()) {
            status = `Game over, ${moveColor} is in checkmate.`;
        } else if (game.in_draw()) {
            status = 'Game over, drawn position';
        } else {
            status = `${moveColor} to move`;
            if (game.in_check()) {
                status += ' (' + moveColor + ' is in check)';
            }
            if(game.turn() === playerColor) {
               status = "Your turn" + (game.in_check() ? " (Check!)" : "");
            }
        }
        statusElement.textContent = status;
    }

    // --- AI Engine (Minimax with simple evaluation) ---
    const pieceValues = { p: 10,  n: 30,  b: 30,  r: 50,  q: 90,  k: 900 };

    function evaluateBoard(boardGame) {
        let score = 0;
        const board = boardGame.board();
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const p = board[r][c];
                if (p) {
                    const val = pieceValues[p.type];
                    // Black wants positive score (maximizing player)
                    score += p.color === 'b' ? val : -val;
                }
            }
        }
        return score;
    }

    function minimax(boardGame, depth, alpha, beta, isMaximizingPlayer) {
        if (depth === 0 || boardGame.game_over()) {
            return evaluateBoard(boardGame);
        }

        const moves = boardGame.moves();

        if (isMaximizingPlayer) { // Black
            let maxEval = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                boardGame.move(moves[i]);
                const ev = minimax(boardGame, depth - 1, alpha, beta, false);
                boardGame.undo();
                maxEval = Math.max(maxEval, ev);
                alpha = Math.max(alpha, ev);
                if (beta <= alpha) break; // Beta cutoff
            }
            return maxEval;
        } else { // White
            let minEval = Infinity;
            for (let i = 0; i < moves.length; i++) {
                boardGame.move(moves[i]);
                const ev = minimax(boardGame, depth - 1, alpha, beta, true);
                boardGame.undo();
                minEval = Math.min(minEval, ev);
                beta = Math.min(beta, ev);
                if (beta <= alpha) break; // Alpha cutoff
            }
            return minEval;
        }
    }

    function makeAIMove() {
        if (game.game_over()) return;
        
        const moves = game.moves();
        if (moves.length === 0) return;

        let bestMove = null;
        let bestValue = -Infinity;
        const searchDepth = 2; // Decent depth for JS without freezing browser

        // Add small randomness for identical evaluations
        // Sort moves randomly first so same evaluations don't always pick the identical move
        moves.sort(() => Math.random() - 0.5);

        for (let i = 0; i < moves.length; i++) {
            game.move(moves[i]);
            // Now it will be white's turn, so we simulate minimizing player
            const boardValue = minimax(game, searchDepth - 1, -Infinity, Infinity, false);
            game.undo();
            
            if (boardValue > bestValue) {
                bestValue = boardValue;
                bestMove = moves[i];
            }
        }

        if (bestMove) {
            game.move(bestMove);
            renderBoard();
            isThinking = false;
            updateStatus();
        }
    }

    window.changeChessColor = function(color) {
        const confirmChange = game.history().length === 0 || confirm("Switching sides will restart the game. Proceed?");
        if(confirmChange) {
            playerColor = color;
            resetChessGame();
        } else {
            // Revert radio button explicitly if cancelled
            document.querySelector(`input[name="chessColor"][value="${playerColor}"]`).checked = true;
        }
    };

    window.resetChessGame = function() {
        game.reset();
        selectedSquare = null;
        possibleMoves = [];
        isThinking = false;
        renderBoard();
        
        if (playerColor === 'b') {
            isThinking = true;
            statusElement.textContent = "AI is thinking...";
            setTimeout(makeAIMove, 200);
        }
    };

    // Initialize the rendering loop
    renderBoard();
}

// Make scrollToSection function global
window.scrollToSection = scrollToSection;
<template>
    <div>
        <h1 v-if="winner" class="winner">Người chơi {{ winner }} thắng!</h1>
        <table>
            <tr v-for="(row, rowIndex) in board" :key="rowIndex">
                <td v-for="(cell, colIndex) in row" :key="colIndex" :class="cell.value === 'X' ? 'one' : 'two'" @click="handleClick(cell)">
                    {{ cell.value }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "Caro",
    data() {
        return {
            rows: 50,
            cols: 50,
            board: [],
            currentPlayer: 'X',
            winner: null,
            winningCells: [],
        }
    },
    created() {
        this.initializeBoard();
    },
    methods: {
        initializeBoard() {
            for (let i = 0; i < this.rows; i++) {
                let row = [];
                for (let j = 0; j < this.cols; j++) {
                    row.push({ value: null, row: i, col: j });
                }
                this.board.push(row);
            }
        },
        handleClick(cell) {
            if (!cell.value && !this.winner) {
                this.board[cell.row][cell.col].value = this.currentPlayer;
                console.log('this.checkWinner(cell): ', this.checkWinner(cell))
                if (this.checkWinner(cell)) {
                    this.winner = this.currentPlayer;
                } else {
                    this.currentPlayer = (this.currentPlayer === 'X') ? 'O' : 'X';
                }
            }
        },
        checkWinner(cell) {
            return (
                this.checkDirection(cell, 0, 1) ||
                this.checkDirection(cell, 0, -1) ||
                this.checkDirection(cell, 1, 0) ||
                this.checkDirection(cell, -1, 0) ||
                this.checkDirection(cell, 1, 1) ||
                this.checkDirection(cell, -1, -1) ||
                this.checkDirection(cell, 1, -1) ||
                this.checkDirection(cell, -1, 1)
            );
        },
        checkDirection(cell, rowDirection, colDirection) {
            const count = this.countConsecutiveCells(cell, rowDirection, colDirection) +
                this.countConsecutiveCells(cell, -rowDirection, -colDirection) + 1;

            if (count >= 5) {
                this.highlightWinnerCells(cell, rowDirection, colDirection);
                return true;
            }

            return false;
        },
        countConsecutiveCells(cell, rowDirection, colDirection) {
            let count = 0;
            let row = cell.row + rowDirection;
            let col = cell.col + colDirection;

            while (row >= 0 && row < this.rows && col >= 0 && col < this.cols &&
            this.board[row][col].value === cell.value) {
                count++;
                row += rowDirection;
                col += colDirection;
            }

            return count;
        },
        highlightWinnerCells(cell, rowDirection, colDirection) {
            this.winningCells = [];

            for (let i = 0; i < 5; i++) {
                const row = cell.row + i * rowDirection;
                const col = cell.col + i * colDirection;
                this.winningCells.push({ row, col });
            }
        },
    },
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    margin: 20px auto;
}

td {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    cursor: pointer;
    text-align: center;
}

td:hover {
    background-color: #f0f0f0;
}

td.one {
    color: #2d2de5;
}

td.two {
    color: #208604;
}

</style>

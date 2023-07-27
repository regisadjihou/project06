document.addEventListener('DOMContentLoaded', () => {
    const doors = document.querySelectorAll('.door');
    const resultElement = document.getElementById('result');
    const resetButton = document.getElementById('resetButton');
  
    let prizes = [100, 200, 500]; // Replace these with the actual prizes or random values
    let selectedDoor;
  
    function getRandomPrize() {
      return prizes[Math.floor(Math.random() * prizes.length)];
    }
  
    function convinceUserToSwitch() {
     // const offer = getRandomPrize();
      const switchMessage = `You've selected door ${selectedDoor + 1}.\n`;
      const offerMessage = `Wait! You could win more by switching to another door!\n`;
      const decisionMessage = `What would you like to do?`;
  
      resultElement.textContent = switchMessage + offerMessage + decisionMessage;
  
      const switchButton = document.createElement('button');
      switchButton.textContent = 'Switch Door';
      switchButton.addEventListener('click', () => {
        selectedDoor = undefined;
        resetGame();
      });
  
      const stickButton = document.createElement('button');
      stickButton.textContent = 'Stick with Your Choice';
      
      stickButton.addEventListener('click', () => {
        revealResults();
      });
  
      resultElement.appendChild(switchButton);
      resultElement.appendChild(stickButton);
    }
  
    function revealResults() {
      const selectedPrize = prizes[selectedDoor];
      const otherDoors = [...prizes.slice(0, selectedDoor), ...prizes.slice(selectedDoor + 1)];
      const alternativePrize = getRandomPrize();
  
      let offer = selectedPrize >= alternativePrize ? alternativePrize : selectedPrize;
  
      resultElement.textContent = `You picked door ${selectedDoor + 1}.\n`;
      resultElement.textContent += `You could have won $${Math.max(...otherDoors)}!\n`;
  
      if (offer >= selectedPrize) {
        resultElement.textContent += `Congratulations! You've won $${selectedPrize}!`;
      } else {
        resultElement.textContent += `You won $${offer}.\n`;
        resultElement.textContent += `You should have switched!`;
      }
    }
  
    function resetGame() {
      for (const door of doors) {
        door.textContent = '';
        door.style.backgroundColor = '#ccc';
      }
      resultElement.textContent = '';
      selectedDoor = undefined;
    }
  
    doors.forEach((door, index) => {
      door.addEventListener('click', () => {
        if (selectedDoor === undefined) {
          selectedDoor = index;
          convinceUserToSwitch();
        }
      });
    });
  
    resetButton.addEventListener('click', () => {
      resetGame();
    });
  });
  
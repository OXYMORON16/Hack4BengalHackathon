
pragma solidity ^0.8.9;//solidity version 

contract Lottery{
    address public manager;
    address[] public players;

    constructor (){
        manager=msg.sender;
    }
    modifier restricted(){
        require (msg.sender == manager);
        _;
    } 

    function playersData() public view returns(address[]memory){
        return players;
    }
    function enter() public payable{
        require(msg.value >=0.05 ether);
        players.push(msg.sender);
    }
    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp)));
        
    }

    function pickWinner() public restricted {
        uint id= random() % players.length;
        payable(players[id]).transfer(address(this).balance);
    }
}

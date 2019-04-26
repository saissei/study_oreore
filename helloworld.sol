pragma solidity >=0.4.0;

contract HelloWorld {
    string public greeting;
    function helloworld(string memory _greeting) public {
        greeting = _greeting;
    }
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
    function say() public view returns (string memory) {
        return greeting;
    }
}
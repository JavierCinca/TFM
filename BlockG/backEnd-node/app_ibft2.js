var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");

var cors = require('cors');
app.use(cors());

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const QRContractABI = [{"inputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"string","name":"_email","type":"string"}],"name":"compraEntrada","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"uint256","name":"_fecha","type":"uint256"},{"internalType":"uint256","name":"_cost","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"receive"},{"inputs":[],"name":"admin","outputs":[{"internalType":"addresspayable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"asistente","outputs":[{"internalType":"string","name":"nombre","type":"string"},{"internalType":"string","name":"email","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"asistentes","outputs":[{"internalType":"addresspayable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"asistentesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fecha","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nombre","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whoAmI","outputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"string","name":"_email","type":"string"}],"stateMutability":"view","type":"function"}];
const QRContract = new web3.eth.Contract(QRContractABI, '0x1BDC897526AfDf2C4Bb0cA2823Ed08184C6B3196'); //Change in first execution
let platformMainAddr = '0xb4aF85e0Dc6Ad65a1E3B68f527B6ca4b1146B51a'; //Change in first execution
const privateKey = ["c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
                    "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
                    "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f"]



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

/**
 * Solicita una peticion de compra 
 * 
 * Request Body
 * {
 * "address": "0x5C3c837B9d1E6C5B18E98F51e8E5aa265b37f0DC",
 * "password": "!@superpassword",
 * "name": "Javier",
 * "eventName": "Champions League",
 * "email": "test66@gmail.com",
 * "price": 230
 * }
 */

router.post("/requestTicket", async function (req, res) {
    const tx = {
        // this could be provider.addresses[0] if it exists
        from: provider.addresses[0], 
        // target address, this could be a smart contract address
        to: 0x1BDC897526AfDf2C4Bb0cA2823Ed08184C6B3196, 
        // optional if you want to specify the gas limit 
        //gas: gasLimit, 
        // optional if you are invoking say a payable function 
        //value: value,
        // this encodes the ABI of the method and the arguements
        data: QRContract.methods.compraEntrada(req.body.name, req.body.email, req.body.address).encodeABI() 
    };
    //Unlock account
    //console.table(req.body);
    //web3.eth.personal.unlockAccount(req.body.address, req.body.password, 15000);
    //Send transaction
    //var returnedValue = await QRContract.methods.compraEntrada(req.body.eventName, req.body.email).send({ from: req.body.address, value: req.body.price, gas:3000000});
    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey[0]);
    signPromise.then((signedTx) => {  

        // raw transaction string may be available in .raw or 
        // .rawTransaction depending on which signTransaction
        // function was called
        const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);  
        
        sentTx.on("receipt", receipt => {
            res.send(JSON.stringify('GREEN'));
        });
        
        sentTx.on("error", err => {
            res.send(JSON.stringify('YELLOW'));
        });
        
      }).catch((err) => {
        console.log(err)
        res.send(JSON.stringify('YELLOW'));
        
      });
   
  });

  /**
   * Genera una nueva cuenta que se le anade 5 ether
   *  
   * RequestBody
   * {
   *  "password" : "!@superpassword"
   * }
   */
  router.post("/requestNewAccount", async function (req, res) {
    (async () => {
      let newAccount = await web3.eth.personal.newAccount(req.body.password);
      web3.eth.sendTransaction({from: platformMainAddr, to:newAccount, value: web3.utils.toWei('5', 'ether'), gasLimit: 21000, gasPrice: 20000000000});

      const response = {"address" : newAccount};
      res.status(200).send(JSON.stringify(response));
    })();
  });


  /**
   * Obtener el precio del evento
   */
router.get("/getEventPrice", async function (req, res) {
  var returnedValue = await QRContract.methods.cost().call();

    res.status(200).send(JSON.stringify(returnedValue));
});

  /**
   * Obtener el precio del evento
   * 
   * URL Path
   * /getAddressEthBalance/0xBDe64338b109F5C144aa66a484f068fF094f2072
   */
   router.get("/getAddressEthBalance/:address", async function (req, res) {
    let returnedValue = await web3.eth.getBalance(req.params.address);
    let convertedValueFromWei = web3.utils.fromWei(returnedValue , 'ether')
  
    res.status(200).send(JSON.stringify(convertedValueFromWei));
  });

app.use(router);

app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});

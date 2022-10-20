import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Row, 
  Col, 
  Button, 
  Input, 
  Label,
  Alert
} from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataArrayInput : [{
        productName : "",
        productPrice : 0,
        qty : 1,
        total : 0
      }],
      grandTotal : 0,
      isError : false,
      messageError : "",
    }
  }

  onCreate = () => {
    const data = {
      productName : "",
      productPrice : 0,
      qty : 1,
      total : 0,
    }
    this.setState({
      dataArrayInput: [...this.state.dataArrayInput,data],
    });
  }

  handleProductPrice = (e,i) => {
    if (e.target.value < 0) {
      this.setState({
        isError : true, 
        messageError : "Harga Tidak Boleh Kurang dari 0"
      })
      this.state.dataArrayInput[i].total = 0
    }else{
      this.setState({
        isError : false
      })
      this.state.dataArrayInput[i].total = this.state.dataArrayInput[i].qty * e.target.value
    }

    this.state.dataArrayInput[i].productPrice = e.target.value
    this.setState({
      dataArrayInput : this.state.dataArrayInput
    })
    this.calculateGrandTotal()
  }

  handleProductQty = (e,i) => {
    if (e.target.value < 0) {
      this.setState({
        isError : true, 
        messageError : "Quantity Tidak Boleh Kurang dari 0"
      })
      this.state.dataArrayInput[i].total = 0
    }else{
      this.setState({
        isError : false
      })
      this.state.dataArrayInput[i].total = this.state.dataArrayInput[i].productPrice * e.target.value
    }
    this.state.dataArrayInput[i].qty = e.target.value
    this.setState({
      dataArrayInput : this.state.dataArrayInput
    })
    this.calculateGrandTotal()
  }

  onDelete = () => {
    this.state.dataArrayInput.splice(this.state.dataArrayInput.length-1,1)
    this.setState({
      dataArrayInput : this.state.dataArrayInput
    })
    this.calculateGrandTotal()
  }

  calculateGrandTotal = () => {
    let grandTotal = 0

    this.state.dataArrayInput.forEach(e => {
      grandTotal += e.total
    });

    this.setState({grandTotal : grandTotal})
  }

  formInput = () => {
    return this.state.dataArrayInput.map((el, i) =>
      <Row className='mt-4' key={i}>
          <Col xs={2}>
            <Label>Product Name</Label>
            <Input
              type='text'
              placeholder = 'Product Name'
              value = {el.productName}
              onChange = {e => {
                this.state.dataArrayInput[i].productName = e.target.value
                this.setState({
                  dataArrayInput : this.state.dataArrayInput
                })
              }}
            />
          </Col>
          <Col xs={2}>
            <Label>Product Price</Label>
            <Input
              type="number"
              value = {el.productPrice}
              onChange = {e => { this.handleProductPrice(e,i) }}
            />
          </Col>
          <Col xs={2}>
            <Label>Qty</Label>
            <Input
              type="number"
              value = {el.qty}
              onChange = {e => { this.handleProductQty(e,i) }}
            />
          </Col>
          <Col xs={2}>
            <Label>Total</Label>
            <Input
              type="number"
              value = {el.total}
            />
          </Col>
          <Col 
            xs={2} 
            className='mt-4'
          >
          {
            i === this.state.dataArrayInput.length-1 && i > 0
            ? <Button 
                size='md' 
                color='danger' 
                onClick={() => this.onDelete()}
                >
                Delete
                </Button>
            : <div></div>
          }
          </Col>
      </Row>
    )
  }

  render() {
    return (
        <Row className="mt-4">
          {
            this.state.isError
            ? <Alert
                color="danger"
              >
                {this.state.messageError}
              </Alert>
            : <div></div>
          }
          <Row>
            <Col>
              <Button 
                className='mr-2' 
                onClick={() => this.onCreate()} 
              >
                New
              </Button>
            </Col>
          </Row>
          <Row>
            {this.formInput()}
          </Row>
          <Row className='mt-4'>
            <Col xs={6}></Col>
            <Col xs={2}>
              <Label>Grand Total</Label>
              <Input
                type='number' 
                value = {this.state.grandTotal}
              />
            </Col>
          </Row>  
        </Row>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Col, Row,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';




class ControlTower extends Component {
  constructor(props) {
    super(props);

    this.state = {

      enquiry_id:[""],
      scust_city_id:"",
      dcust_city_id:"",
      goods_type_id : [""],
      status: "",

    };

    this.handleInputChange= e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };
D

  }


  render(){
    return (
      <Form>
        <h3><center><u><b>Enquiry</b></u> </center></h3>
        <FormGroup row>
          <Label for="loading" sm={2}>Loading</Label>
          <Col md={2}>
            <Input type="text" 
              name="scust_city_id" 
              id="scust_city_id" 
              value={this.state.scust_city_id} 
              onChange={(e) => this.handleInputchange(e)} 
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="destination_customer" sm={2}>Destination Customer City</Label>
          <Col md={2}>
          <Input type="text" 
            name="dcust_city_id" 
            onChange={e => this.handleInputchange(e)}
          />
          </Col>
        </FormGroup>
        <FormGroup>
          <h3><Label for="goods">Goods</Label></h3>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="goodsType">Goods Type</Label>
                <Input type="text"
                  name="goods_type_id" 
                  id="customerName" 
                  onChange={e => this.handleInputchange(e)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="customerAge">Goods Weight</Label>
                <Input type="text" name="cust" id="customerAge"  />
              </FormGroup>
            </Col>
            <Col md={6}>    
              <FormGroup>
                <Label for="relation">Goods Status</Label>
                <Input type="text" 
                  name="goodsStatus" 
                  id="goodsStatus" 
                  onChange={e => this.handleInputchange(e)} 
                />
              </FormGroup>
          </Col>
        </Row>
      </FormGroup>
      <Button onClick={e => this.onSubmit(e)}>Submit</Button>
    </Form>
    );
  }
};

export default ControlTower;
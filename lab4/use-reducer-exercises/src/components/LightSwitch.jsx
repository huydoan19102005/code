// ToggleComponent.jsx - Exercise 2: Bật/tắt trạng thái sử dụng useReducer
import React, { useReducer } from 'react';
import { Button, Card, Badge, Row, Col, Container } from 'react-bootstrap';

// 1. Khởi tạo trạng thái ban đầu
const initialState = {
  isOn: false,
  toggleCount: 0,
  lastToggled: null
};

// 2. Định nghĩa hàm reducer để xử lý các action bật/tắt
function toggleReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return {
        ...state,
        isOn: !state.isOn,
        toggleCount: state.toggleCount + 1,
        lastToggled: new Date().toLocaleTimeString()
      };
    case 'turnOn':
      return {
        ...state,
        isOn: true,
        toggleCount: state.toggleCount + 1,
        lastToggled: new Date().toLocaleTimeString()
      };
    case 'turnOff':
      return {
        ...state,
        isOn: false,
        toggleCount: state.toggleCount + 1,
        lastToggled: new Date().toLocaleTimeString()
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function ToggleComponent() {
  // 3. Sử dụng useReducer để quản lý trạng thái toggle
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  // Action handlers
  const toggle = () => dispatch({ type: 'toggle' });
  const turnOn = () => dispatch({ type: 'turnOn' });
  const turnOff = () => dispatch({ type: 'turnOff' });
  const reset = () => dispatch({ type: 'reset' });

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Header className="text-center bg-primary text-white">
              <h2 className="mb-0">Bật/Tắt Trạng thái với useReducer</h2>
            </Card.Header>

            <Card.Body className="text-center">
              {/* Hiển thị trạng thái hiện tại */}
              <Card
                className={`mb-4 ${state.isOn ? 'border-success bg-light' : 'border-danger bg-light'}`}
                style={{ borderWidth: '3px' }}
              >
                <Card.Body className="py-4">
                  <h3 className={`mb-0 ${state.isOn ? 'text-success' : 'text-danger'}`}>
                    {state.isOn ? '🟢 BẬT' : '🔴 TẮT'}
                  </h3>
                </Card.Body>
              </Card>

              {/* Thông tin chi tiết */}
              <Row className="mb-4">
                <Col>
                  <Badge bg="info" className="fs-6 p-2">
                    Số lần bật/tắt: {state.toggleCount}
                  </Badge>
                </Col>
              </Row>

              {state.lastToggled && (
                <Row className="mb-4">
                  <Col>
                    <Badge bg="secondary" className="fs-6 p-2">
                      Lần cuối: {state.lastToggled}
                    </Badge>
                  </Col>
                </Row>
              )}

              {/* Các nút điều khiển */}
              <Row className="g-2 mb-4">
                <Col xs={12} sm={6}>
                  <Button
                    onClick={toggle}
                    variant={state.isOn ? 'danger' : 'success'}
                    size="lg"
                    className="w-100"
                  >
                    {state.isOn ? 'Tắt' : 'Bật'} (Toggle)
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button
                    onClick={turnOn}
                    variant="success"
                    size="lg"
                    className="w-100"
                  >
                    Bật
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button
                    onClick={turnOff}
                    variant="danger"
                    size="lg"
                    className="w-100"
                  >
                    Tắt
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button
                    onClick={reset}
                    variant="secondary"
                    size="lg"
                    className="w-100"
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Card.Body>

            {/* Mô tả chức năng */}
            <Card.Footer className="bg-light">
              <h5 className="text-muted mb-3">📝 Giải thích:</h5>
              <Row>
                <Col>
                  <ul className="list-unstyled text-start">
                    <li className="mb-2">
                      <Badge bg="primary" className="me-2">Toggle</Badge>
                      Chuyển đổi trạng thái (bật ↔ tắt)
                    </li>
                    <li className="mb-2">
                      <Badge bg="success" className="me-2">Bật</Badge>
                      Luôn bật trạng thái
                    </li>
                    <li className="mb-2">
                      <Badge bg="danger" className="me-2">Tắt</Badge>
                      Luôn tắt trạng thái
                    </li>
                    <li className="mb-2">
                      <Badge bg="secondary" className="me-2">Reset</Badge>
                      Đặt lại về trạng thái ban đầu
                    </li>
                  </ul>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ToggleComponent;

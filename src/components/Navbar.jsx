import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default function NavbarComponent(props) {
  return (
    <Navbar
      className={`p-2 w-100 ${props.mode === 'black' ? 'bg-dark text-white border-2 border-white' : 'bg-light text-dark border-2 border-black'} `}
      expand="lg"
      style={{ height: '10vh', borderRadius: '10px' }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left-Aligned Span */}
        <Navbar.Brand>
          <span>
            MD Generator <sub>Your Idea, Our Style</sub>
          </span>
        </Navbar.Brand>

        {/* Right-Aligned GitHub Link and Dark Mode Toggle */}
        <div className="d-flex align-items-center">
          <Navbar.Text className="me-3">
            <a
              href="https://github.com/soumyajit4419/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
              style={{ color: props.mode === 'black' ? '#fff' : '#000' }}
            >
              GitHub Repository
            </a>
          </Navbar.Text>
          <Button
            variant={props.mode === 'black' ? 'outline-light' : 'outline-dark'}
            onClick={props.toggleMode}
          >
            {props.mode === 'black' ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

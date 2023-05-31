import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton, Form, Button } from "react-bootstrap";

export default function SelectComponent({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelectOption = (optionValue) => {
    setSelectedOption(optionValue);
    setIsSelectOpen(false);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    setIsSelectOpen(searchValue.length > 0);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSend = () => {
  if (selectedOption) {
    const selectedOptionIndex = options.findIndex(
      (option) => option.value === selectedOption
    );
    const respostas = selectedOptionIndex;
    const contador = 1;

    onSelect(selectedOption, { respostas, contador });
  }
};

  return (
    <div>
      <Form.Group>
        <Form.Control
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Digite para pesquisar"
        />
      </Form.Group>
      <DropdownButton title="Selecione uma opção" show={isSelectOpen} onToggle={(isOpen) => setIsSelectOpen(isOpen)}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => handleSelectOption(option.value)}
            >
              {option.label}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>Nenhuma opção encontrada.</Dropdown.Item>
        )}
      </DropdownButton>
      <div>
        <p>Opção selecionada: {selectedOption}</p>
        <Button variant="primary" onClick={handleSend}>
          Enviar
        </Button>
      </div>
    </div>
  );
}

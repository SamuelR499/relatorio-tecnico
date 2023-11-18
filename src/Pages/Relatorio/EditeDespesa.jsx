import React, { useState } from 'react';

function ModalWithForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode fazer algo com os dados do formulário, como enviar para um servidor
    console.log(formData);
    // Para fechar o modal após enviar o formulário
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={ toggleModal }>Abrir Modal</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={ toggleModal }>
              &times;
            </span>
            <h2>Formulário</h2>
            <form onSubmit={ handleSubmit }>
              <div>
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={ formData.name }
                  onChange={ handleChange }
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ formData.email }
                  onChange={ handleChange }
                />
              </div>
              <div>
                <label htmlFor="message">Mensagem:</label>
                <textarea
                  id="message"
                  name="message"
                  value={ formData.message }
                  onChange={ handleChange }
                />
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalWithForm;

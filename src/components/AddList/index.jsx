import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './AddList.scss'
import List from '../List'
import Badge from '../Badge'
import addSvg from '../../assets/img/add.svg'
import closeImg from '../../assets/img/close.svg'

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [selectedColor, setSelectedColor] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id)
    }
  }, [colors])

  const onClose = () => {
    setVisiblePopup(false)
    setInputValue('')
    setSelectedColor(colors[0].id)
  }

  const addList = () => {
    if (!inputValue) {
      alert('Поле не может быть пустым!')
      return
    }

    setIsLoading(true)

    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor
      })
      .then(({ data }) => {
        const color = colors.filter(c => c.id === selectedColor)[0]
        const listObj = { ...data, color, tasks: [] }
        onAdd(listObj)
        onClose()
      })
      .catch(() => {
        alert('Ошибка при добавлении списка!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: <img src={addSvg} alt="Add list" />,
            name: 'Добавить список'
          }
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeImg}
            alt="Закрыть меню"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название папки"
          />
          <div className="add-list__popup-colors">
            {colors.map(color => (
              <Badge
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={selectedColor === color.id && 'active'}
                color={color.name}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AddList

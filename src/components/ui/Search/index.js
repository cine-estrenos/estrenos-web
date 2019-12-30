import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Styled Components
import { Form, Input } from './styled'

const Search = ({ placeholder }) => {
  const [query, setQuery] = useState('')

  const handleChangeQuery = ({ target }) => setQuery(target.value)

  return (
    <Form>
      <Input value={query} onChange={handleChangeQuery} placeholder={placeholder} />
    </Form>
  )
}

Search.propTypes = {
  placeholder: PropTypes.string,
}

Search.defaultProps = {
  placeholder: 'Buscá por película o cine',
}

export default Search

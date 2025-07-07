import '../test/mocks/framer-motion'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from './About'

describe('About', () => {
  it('renders the about section with title', () => {
    render(<About />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Me')).toBeInTheDocument()
  })

  it('displays all experience entries', () => {
    render(<About />)
    
    // Check if all job roles are present
    expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Junior Web Developer')).toBeInTheDocument()
    
    // Check if all companies are present
    expect(screen.getByText('Tech Solutions Inc.')).toBeInTheDocument()
    expect(screen.getByText('Digital Creatives')).toBeInTheDocument()
    expect(screen.getByText('WebStart')).toBeInTheDocument()
    
    // Check if all periods are present
    expect(screen.getByText('2020 - Present')).toBeInTheDocument()
    expect(screen.getByText('2018 - 2020')).toBeInTheDocument()
    expect(screen.getByText('2016 - 2018')).toBeInTheDocument()
  })
})

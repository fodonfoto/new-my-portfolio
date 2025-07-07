import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeaderNav from './HeaderNav'

describe('HeaderNav', () => {
  it('renders all navigation links', () => {
    render(<HeaderNav />)
    
    // Check if all nav links are present
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('desktop nav is visible on large screens', () => {
    window.innerWidth = 1024
    window.dispatchEvent(new Event('resize'))
    
    render(<HeaderNav />)
    
    const desktopNav = screen.getByRole('navigation')
    expect(desktopNav).toHaveClass('hidden md:flex')
  })

  it('shows mobile menu button on small screens', () => {
    window.innerWidth = 768
    window.dispatchEvent(new Event('resize'))
    
    render(<HeaderNav />)
    
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toBeInTheDocument()
  })
})

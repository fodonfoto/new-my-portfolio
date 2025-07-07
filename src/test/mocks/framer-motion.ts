import { vi } from 'vitest'
import React from 'react'

// Mock framer-motion to avoid animation-related issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => React.createElement('div', props),
    section: (props: any) => React.createElement('section', props),
  },
}))

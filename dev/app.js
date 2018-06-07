import {h, Component} from './composi'
import {title} from './components/title'
import { Game } from './components/game'

// Set state on component.
// Will cause component to render.
title.setState('Masterminds')


new Game({
  guess: null,
  difficulty: 'EASY'
})
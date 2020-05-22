const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return 'Your notes...'
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicatedNote = notes.find(note => note.title === title)

  if (!duplicatedNote) {
    notes.push({
      title,
      body
    })
    saveNotes(notes)
    console.log('New note added')
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = title => {
  const notes = loadNotes()

  const notesToKeep = notes.filter(note => note.title !== title)

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(chalk.bgBlue('Note removed!'))
  } else {
    console.log(chalk.bgRed('No note found!'))
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    return []
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.inverse('Your notes'))

  notes.forEach(note => console.log(note.title))
}

const readNote = title => {
  const notes = loadNotes()

  const noteToRead = notes.find(note => note.title === title)

  if (noteToRead) {
    console.log('Tile: ' + noteToRead.title)
    console.log('Body: ' + noteToRead.body)
  } else {
    console.log(chalk.red.inverse('No note found'))
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote
}

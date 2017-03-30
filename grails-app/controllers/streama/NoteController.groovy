package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class NoteController {

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

  def index(Integer max) {
    params.max = Math.min(max ?: 10, 100)
    JSON.use('admin') {
      respond Note.list(), [status: OK]
    }
  }

  @Transactional
  def save(Note noteInstance) {
    if (noteInstance == null) {
      render status: NOT_FOUND
      return
    }

    noteInstance.validate()
    if (noteInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    noteInstance.save flush:true
    respond noteInstance, [status: CREATED]
  }

  @Transactional
  def update(Note noteInstance) {
    if (noteInstance == null) {
      render status: NOT_FOUND
      return
    }

    noteInstance.validate()
    if (noteInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    noteInstance.save flush:true
    respond noteInstance, [status: OK]
  }

  @Transactional
  def delete(Note noteInstance) {

    if (noteInstance == null) {
      render status: NOT_FOUND
      return
    }
    noteInstance.delete flush:true
    render status: NO_CONTENT
  }


  def show(Note noteInstance) {

    respond noteInstance, [status: OK]

  }
}

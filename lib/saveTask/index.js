'use babel'
import call from './call'
import prompt from '../prompt'

export default async function () {
  const task = await prompt({
    title: 'New Task',
    fields: {
      name: {
        placeholder: 'Tarea',
        type: 'text'
      },
      duration: {
        placeholder: 'Duración',
        type: 'options',
        allowOthers: true,
        options: [
          {value: 30, label: '30m'},
          {value: 60, label: '1h'},
          {value: 60 * 2, label: '2h'},
          {value: 60 * 3, label: '3h'},
          {value: 60 * 4, label: '4h'},
          {value: 60 * 5, label: '5h'},
          {value: 60 * 6, label: '6h'},
          {value: 60 * 8, label: '8h'},
          {value: 60 * 10, label: '10h'}
        ]
      },
      category: {
        placeholder: 'Tipo',
        type: 'options',
        options: [
          {
            label: 'Arreglo',
            value: 'fix'
          },
          {
            label: 'Nueva funcionalidad',
            value: 'feature'
          },
          {
            label: 'Refactorización',
            value: 'refactoring'
          }
        ]
      }
    }
  })
  task.completedAt = new Date()
  const query = `mutation createTask ($task: ProjectTaskInput!) {
    createTask (task: $task) {
      _id
    }
  }`
  console.log('variables', task)
  const result = await call(query, {task})
  console.log(result)
}

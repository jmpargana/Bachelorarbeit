export default function appReducer(state: any, action: any){
  switch (action.type) {
    case 'INITIATE_TOPICS': 
      return;
    case 'UPLOAD_TOPIC': 
      return;
    case 'UPLOAD_QUESTION': 
      return;
    case 'UPLOAD_TEXTBOOK':
      return;
    default:
      return state;
  }
}

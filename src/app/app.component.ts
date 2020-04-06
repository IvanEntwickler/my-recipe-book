
import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-recipe-book';
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    return this.loadedFeature = feature;
  }



}

import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';
import { FilterTextComponent } from '../blocks/filter-text';
import { store, filterCourses } from '../store';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  // courses: Course[];
  filteredCourses = [];
  constructor(private _courseService: CourseService) {
  }

  filterChanged(searchText: string) {
    console.log('user searched: ', searchText);
    // this.filteredCourses = this._filterService.filter(searchText, ['id', 'name', 'topic'], this.courses);
    // dispatch new filterCourses action
    store.dispatch(filterCourses(searchText));
  }

  // this gets replaced with updateFromState
  // getCourses() {
  //   this._courseService.getCourses()
  //     .subscribe(courses => {
  //       this.courses = this.filteredCourses = courses;
  //     });
  // }

  // deal with store
  updateFromState() {
    const allState = store.getState();
    // no longerneed this because our store takes care of this for us
    // this.courses = allState.courses;
    // this component should only show filtered courses now
    this.filteredCourses = allState.filteredCourses;
  }

  ngOnInit() {
    // this.getCourses();
    this.updateFromState();
    // the following handles updates in the state by subscribing
    store.subscribe(() => {
      this.updateFromState();
    });
    componentHandler.upgradeDom();
  }
}

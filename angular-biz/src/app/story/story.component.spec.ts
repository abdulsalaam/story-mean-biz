import { TestBed, async } from '@angular/core/testing';
import { StoryComponent } from './story.component';
describe('StoryComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoryComponent
      ],
    }).compileComponents();
  }));
  it('should create the story', async(() => {
    const fixture = TestBed.createComponent(StoryComponent);
    const story = fixture.debugElement.componentInstance;
    expect(story).toBeTruthy();
  }));
  it(`should have as title 'story'`, async(() => {
    const fixture = TestBed.createComponent(StoryComponent);
    const story = fixture.debugElement.componentInstance;
    expect(story.title).toEqual('story');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(StoryComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to story!');
  }));
});

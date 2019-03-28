HTML5 Canvas Basketball created by Michael Wilkie

Press S to shoot a ball, press space to jump.
The challenge is developing a feel for the timing of your jump and your shot to make it into the basket.

All source code, image, and sound files were made in either Notepad++, Audacity, or Microsoft Paint.

Challenges:
    Figuring out how velocity-based physics and collision should work with rectangles.
    Figuring out how to display images rotated by their angle.

Bugs:
    - The balls will flicker sometimes after scoring a goal. This is most likely because of an asynchronous programming issue.
      When a ball is scored, a setTimeout event is set to make the ball disappear and hoop relocate. Simultaneously, star effects poof out with changing alpha values.
      The star effects manually change the global alpha value to make them appear as if they are vanishing. This may be why the ball also vanishes for a few frames.
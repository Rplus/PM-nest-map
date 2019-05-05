let aside = document.createElement('aside');

aside.id = 'info';
aside.className = 'info dialog';

aside.innerHTML = `
  <a class="reset-info" href="#"></a>
  <article class="info-article dialog-content">
    <a href="#" class="close-dialog close-info">❌</a>
    <h1>【 寶可夢巢穴地圖 】</h1>
    <ul>
      <li>
        操作介紹與教學：
        <br>
        <a href="https://github.com/Rplus/PM-nest-map/blob/master/USAGE.md">
          https://github.com/Rplus/PM-nest-map/blob/master/USAGE.md
        </a>
      </li>

      <li>
        專案原始碼：
        <br>
        <a href="https://github.com/Rplus/PM-nest-map">
          https://github.com/Rplus/PM-nest-map
        </a>
      </li>

      <li>
        問題回報：
        <br>
        <a href="https://github.com/Rplus/PM-nest-map/issues">
          https://github.com/Rplus/PM-nest-map/issues
        </a>
      </li>

      <li>
        寶可夢圖示來源：
        <br>
        <a href="https://archives.bulbagarden.net/w/index.php?title=Category:Shuffle_icons&fileuntil=115%0AShuffle115M.png#mw-category-media">
          Category:Shuffle icons - Bulbagarden Archives
        </a>
      </li>

      <li>
        地圖圖資：
        <br>
        © OpenStreetMap & Google map
      </li>
    </ul>
  </article>
`;

export default aside;

let infoBtn = document.createElement('div');
infoBtn.className = 'info-btn button';

infoBtn.innerHTML = `
  <button>註</button>
  <a href="#info" title="說明"></a>
`;

export { infoBtn }
